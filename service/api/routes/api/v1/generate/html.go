package generate

import (
	"log"
	"net/http"
	"pdf-generator/domain/pdf"
	"pdf-generator/utils"
)

type GenerateHtmlRequest struct {
	Template  string            `json:"template" binding:"required" example:"https://drive.google.com/uc?export=download&id=16oauTQqVnJtJEl8unMYyUpH6BILRS97C"`
	Variables map[string]string `json:"variables" example:"name:John Doe,amount:100.00,currency:EUR,reference:ABC123,date:2025-05-04"`
}

// @Summary		Generate something
// @Description	Generate a PDF document from template based on the provided variables
// @Tags			PDF Generate
// @Accept			json
// @Produce		application/pdf
//
// @Param			request	body		GenerateHtmlRequest	true	"Request body"
// @Success		200		{file}		file				"PDF file"
// @Failure		400		{string}	string				"Invalid input"
// @Failure		500		{string}	string				"Internal server error"
// @Router			/api/v1/generate/html [post]
func PostHtml(pdfDispatcher *pdf.PdfDispatcher) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		log.Println("🔄 Handling POST /generate request")

		req, parseErr := utils.ParseRequest[GenerateHtmlRequest](request)
		if parseErr != nil {
			log.Println("❌ Error parsing request:", parseErr)
			http.Error(response, "Invalid input", http.StatusBadRequest)
			return
		}

		pdfData, generateErr := pdfDispatcher.GenerateFromUrl("html", req.Template, req.Variables)
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
