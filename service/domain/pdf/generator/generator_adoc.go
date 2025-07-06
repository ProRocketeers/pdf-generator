package generator

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

func (g *AdocGenerator) GenerateFromTemplate(template []byte, variables map[string]string) ([]byte, error) {
	// 🗂️ Create a temporary directory
	tmpDir, err := os.MkdirTemp("", "asciidoc")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	inputPath := filepath.Join(tmpDir, "input.adoc")
	outputPath := filepath.Join(tmpDir, "output.pdf")

	// 💾 Save the template to a file
	if err := os.WriteFile(inputPath, template, 0644); err != nil {
		return nil, fmt.Errorf("failed to write input file: %w", err)
	}

	// ⚙️ Build CLI attributes
	args := []string{}
	for key, val := range variables {
		args = append(args, "-a", fmt.Sprintf("%s=%s", key, val))
	}
	args = append(args, "-o", outputPath)
	args = append(args, inputPath)

	// 🚀 Run asciidoctor-pdf
	cmd := exec.Command("asciidoctor-pdf", args...)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("asciidoctor-pdf failed: %v\nOutput: %s", err, output)
	}

	// 📖 Read the generated PDF
	pdfData, err := os.ReadFile(outputPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read generated PDF: %w", err)
	}

	// 🗃️ Return the generated PDF as a byte slice
	return pdfData, nil
}
