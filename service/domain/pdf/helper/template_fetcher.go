package helper

import (
	"fmt"
	"io"
	"net/http"
)

type TemplateFetcher struct{}

func (templateFetcher *TemplateFetcher) FetchTemplate(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch template: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	templateContent, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read template content: %w", err)
	}

	return templateContent, nil
}
