package pdf

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

type AdocGenerator struct{}

func NewAdocGenerator() *AdocGenerator {
	return &AdocGenerator{}
}

func (g *AdocGenerator) GenerateFromTemplate(template string, vars map[string]string) ([]byte, error) {
	// Vytvoření dočasného adresáře
	tmpDir, err := os.MkdirTemp("", "asciidoc")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	inputPath := filepath.Join(tmpDir, "input.adoc")
	outputPath := filepath.Join(tmpDir, "output.pdf")

	// Uložení šablony do souboru
	if err := os.WriteFile(inputPath, []byte(template), 0644); err != nil {
		return nil, fmt.Errorf("failed to write input file: %w", err)
	}

	// Sestav CLI atributy z mapy
	args := []string{}
	for key, val := range vars {
		args = append(args, "-a", fmt.Sprintf("%s=%s", key, val))
	}
	args = append(args, "-o", outputPath)
	args = append(args, inputPath)

	// Spuštění asciidoctor-pdf
	cmd := exec.Command("asciidoctor-pdf", args...)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("asciidoctor-pdf failed: %v\nOutput: %s", err, output)
	}

	// Načtení vygenerovaného PDF
	pdfData, err := os.ReadFile(outputPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read generated PDF: %w", err)
	}

	return pdfData, nil
}
