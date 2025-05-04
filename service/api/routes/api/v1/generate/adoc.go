package generate

import (
	"log"
	"net/http"
	"pdf-generator/domain/pdf"
	"pdf-generator/utils"
)

type GenerateAdocRequest struct {
	Template  string            `json:"template" binding:"required" example:"https://drive.google.com/uc?export=download&id=1qZS9uxSwsrHSMudfpDTbWQHBIM5vOnrF"`
	Variables map[string]string `json:"variables" example:"name:John Doe,amount:100.00,currency:EUR,reference:ABC123,date:2025-05-04"`
}

// @Summary		Generate something
// @Description	Generate a PDF document from template based on the provided variables
// @Tags			PDF Generate
// @Accept			json
// @Produce		application/pdf
//
// @Param			request	body		GenerateAdocRequest	true	"Request body"	example("template:https://example.com/template.adoc, variables: {}")
// @Success		200		{file}		file				"PDF file"
// @Failure		400		{string}	string				"Invalid input"
// @Failure		500		{string}	string				"Internal server error"
// @Router			/api/v1/generate/adoc [post]
func PostAdoc(pdfDispatcher *pdf.PdfDispatcher) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		log.Println("🔄 Handling POST /generate request")

		// TODO: Implement PDF generation logic ===
		req, parseErr := utils.ParseRequest[GenerateAdocRequest](request)
		if parseErr != nil {
			log.Println("❌ Error parsing request:", parseErr)
			http.Error(response, "Invalid input", http.StatusBadRequest)
			return
		}

		// TODO: Get template type from somewhere
		pdfData, generateErr := pdfDispatcher.GenerateFromUrl("adoc", req.Template, req.Variables)
		if generateErr != nil {
			log.Println("❌ Error generating PDF:", generateErr)
			http.Error(response, "Failed to generate PDF", http.StatusInternalServerError)
			return
		}
		// ========================================
		filename := "generated.pdf" // TODO: Get filename from template url

		response.Header().Set("Content-Type", "application/pdf")
		response.Header().Set("Content-Disposition", `attachment; filename="`+filename+`"`)

		response.WriteHeader(http.StatusOK)
		response.Write(pdfData)
		log.Println("📄 PDF file served:", filename)
	}
}
