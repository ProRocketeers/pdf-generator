package pdf

import (
	"log"
	"pdf-generator/domain/pdf/helper"
	"strings"
)

type PdfDispatcher struct {
	fetcher helper.TemplateFetcher
	adoc    PDFGenerator
	html    PDFGenerator
	// ...
}

func NewPdfDispatcher() *PdfDispatcher {
	return &PdfDispatcher{
		fetcher: helper.TemplateFetcher{},
		adoc:    NewAdocGenerator(),
		html:    NewHtmlGenerator(),
		// ...
	}
}

func (d *PdfDispatcher) selectGenerator(templateType string) PDFGenerator {
	switch strings.ToLower(templateType) {
	case "adoc":
		return d.adoc
	case "html":
		return d.html
	// ...
	default:
		return d.adoc // fallback nebo error
	}
}

func (d *PdfDispatcher) GenerateFromUrl(typ, url string, vars map[string]string) ([]byte, error) {
	data, err := d.fetcher.FetchTemplate(url)
	if err != nil {
		log.Println("❌ Error fetching template:", err)
		return nil, err
	}

	return d.GenerateFromTemplate(typ, string(data), vars)
}

func (d *PdfDispatcher) GenerateFromTemplate(typ, template string, vars map[string]string) ([]byte, error) {
	return d.selectGenerator(typ).GenerateFromTemplate(template, vars)
}
