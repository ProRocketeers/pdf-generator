package pdf

import (
	"bytes"
	"context"
	"fmt"
	"html/template"
	"net/url"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
)

type HtmlGenerator struct{}

func NewHtmlGenerator() *HtmlGenerator {
	return &HtmlGenerator{}
}

func (g *HtmlGenerator) GenerateFromTemplate(tpl []byte, variables map[string]string) ([]byte, error) {
	// 🧩 Render HTML template
	tmpl, err := template.New("pdf-template").Parse(string(tpl))
	if err != nil {
		return nil, fmt.Errorf("failed to parse template: %w", err)
	}

	var rendered bytes.Buffer
	err = tmpl.Execute(&rendered, variables)
	if err != nil {
		return nil, fmt.Errorf("failed to execute template: %w", err)
	}
	renderedHTML := rendered.String()

	// ✅ Pass HTML as data URL
	htmlDataURL := "data:text/html," + url.PathEscape(renderedHTML)

	// 🌐 Set up context
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	// 🖨️ Create PDF from HTML using chromedp
	var pdfData []byte

	err = chromedp.Run(ctx,
		chromedp.Navigate(htmlDataURL),
		chromedp.WaitReady("body", chromedp.ByQuery),
		chromedp.Sleep(500*time.Millisecond),
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			pdfData, _, err = page.PrintToPDF().WithPrintBackground(true).Do(ctx)
			return err
		}),
	)
	if err != nil {
		return nil, fmt.Errorf("chromedp run failed: %w", err)
	}

	// 🗃️ Return generated PDF as byte slice
	return pdfData, nil
}
