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

func (g *HtmlGenerator) GenerateFromTemplate(tpl string, vars map[string]string) ([]byte, error) {
	// 🧩 Render HTML šablony
	tmpl, err := template.New("pdf-template").Parse(tpl)
	if err != nil {
		return nil, fmt.Errorf("failed to parse template: %w", err)
	}

	var rendered bytes.Buffer
	err = tmpl.Execute(&rendered, vars)
	if err != nil {
		return nil, fmt.Errorf("failed to execute template: %w", err)
	}
	renderedHTML := rendered.String()

	// ✅ Předání HTML jako data URL
	htmlDataURL := "data:text/html," + url.PathEscape(renderedHTML)

	// 🌐 Nastavení kontextu
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	var pdfBuf []byte

	err = chromedp.Run(ctx,
		chromedp.Navigate(htmlDataURL),
		chromedp.WaitReady("body", chromedp.ByQuery),
		chromedp.Sleep(500*time.Millisecond),
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			pdfBuf, _, err = page.PrintToPDF().WithPrintBackground(true).Do(ctx)
			return err
		}),
	)
	if err != nil {
		return nil, fmt.Errorf("chromedp run failed: %w", err)
	}

	return pdfBuf, nil
}
