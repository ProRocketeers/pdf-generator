package pdf

type PDFGenerator interface {
	// GenerateFromUrl(url string, vars map[string]string) ([]byte, error)
	GenerateFromTemplate(template string, vars map[string]string) ([]byte, error)
}
