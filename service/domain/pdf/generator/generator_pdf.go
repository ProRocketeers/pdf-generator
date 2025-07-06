package generator

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/pdfcpu/pdfcpu/pkg/api"
)

type TextField struct {
	Name   string `json:"name"`
	Value  string `json:"value"`
	Locked bool   `json:"locked"`
}

type Form struct {
	TextFields []TextField `json:"textfield"`
}

type PDFForm struct {
	Header struct {
		Source   string `json:"source"`
		Version  string `json:"version"`
		Creation string `json:"creation"`
		Producer string `json:"producer"`
	} `json:"header"`
	Forms []Form `json:"forms"`
}

type PDFGeneratorForPdfTemplate struct{}

func NewPdfGenerator() *PDFGeneratorForPdfTemplate {
	return &PDFGeneratorForPdfTemplate{}
}

func (g *PDFGeneratorForPdfTemplate) GenerateFromTemplate(template []byte, vars map[string]string) ([]byte, error) {
	// Ulož dočasně šablonu
	inputFile, err := os.CreateTemp("", "input-*.pdf")
	if err != nil {
		return nil, err
	}
	defer os.Remove(inputFile.Name())

	if _, err := inputFile.Write(template); err != nil {
		return nil, err
	}
	inputFile.Close()

	// Ulož dočasně JSON dat pro formulář
	formData := PDFForm{}
	formData.Header.Version = "pdfcpu v0.4.1"
	formData.Header.Creation = time.Now().Format("2006-01-02 15:04:05 MST")
	formData.Header.Producer = "pdfcpu v0.4.1"

	textfields := []TextField{}
	for k, v := range vars {
		tf := TextField{
			Name:   k,
			Value:  v,
			Locked: false,
		}
		textfields = append(textfields, tf)
	}

	formData.Forms = []Form{
		{
			TextFields: textfields,
		},
	}

	valuesFile, err := os.CreateTemp("", "values-*.json")
	if err != nil {
		return nil, err
	}
	defer os.Remove(valuesFile.Name())

	enc := json.NewEncoder(valuesFile)
	enc.SetIndent("", "  ")
	if err := enc.Encode(formData); err != nil {
		return nil, err
	}
	valuesFile.Close()

	// Vytvoř dočasný výstupní soubor
	outputFile, err := os.CreateTemp("", "output-*.pdf")
	if err != nil {
		return nil, err
	}
	defer os.Remove(outputFile.Name())
	outputFile.Close()

	// Vyplň formulář
	if err := api.FillFormFile(inputFile.Name(), valuesFile.Name(), outputFile.Name(), nil); err != nil {
		return nil, fmt.Errorf("fill form failed: %w", err)
	}

	return os.ReadFile(outputFile.Name())
}
