package routes

import (
	"log"
	"net/http"
	"path/filepath"
)

type TemplateVariables struct {
	Name   string `json:"name" example:"John Doe"`
	Amount string `json:"amount" example:"100.00"`
}

type GenerateRequest struct {
	Template  string            `json:"template" binding:"required" example:"https://example.com/template.adoc"`
	Variables TemplateVariables `json:"variables"`
}

//	@Summary		Generate something
//	@Description	Generate a PDF document from template based on the provided variables
//	@Tags			PDF Generate
//	@Accept			json
//	@Produce		application/pdf
//
//	@Param			request	body		GenerateRequest	true	"Request body"
//	@Success		200		{file}		file			"PDF file"
//	@Failure		400		{string}	string			"Invalid input"
//	@Failure		500		{string}	string			"Internal server error"
//	@Router			/api/v1/generate [post]
func PostGenerate(response http.ResponseWriter, request *http.Request) {
	log.Println("🔄 Handling POST /generate request")

	// TODO: Implement PDF generation logic

	// Mock response for demonstration
	filename := "invoice.pdf"
	filepath := filepath.Join("templates", filename)

	response.Header().Set("Content-Type", "application/pdf")
	response.Header().Set("Content-Disposition", `attachment; filename="`+filename+`"`)

	log.Println("📄 PDF file served:", filename)
	http.ServeFile(response, request, filepath)
}
