package generate

type GenerateRequest struct {
	Template  string            `json:"template" binding:"required" example:"https://example.com/template.adoc"`
	Variables map[string]string `json:"variables" example:"name:John Doe,amount:100.00"`
}
