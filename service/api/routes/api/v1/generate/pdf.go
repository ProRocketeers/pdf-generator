package generate

import (
	"log"
	"net/http"
	"pdf-generator/domain/pdf"
	"pdf-generator/utils"
)

// TODO: Add a example of the request
type GeneratePDFRequest struct {
	Template  string            `json:"template" binding:"required" example:"https://drive.google.com/uc?export=download&id=1SxtqHergEau6QGIvgbzC2LI4Cz9pFJM2"`
	Variables map[string]string `json:"variables" example:"Text1:ABC123,Text2:John Doe,Text3:100.00,Text4:EUR,Text5:2025-05-04"`
}

// @Summary		Generate something
// @Description	Generate a PDF document from template based on the provided variables
// @Tags			PDF Generate
// @Accept			json
// @Produce		application/pdf
//
// @Param			request	body		GeneratePDFRequest	true	"Request body"
// @Success		200		{file}		file				"PDF file"
// @Failure		400		{string}	string				"Invalid input"
// @Failure		500		{string}	string				"Internal server error"
// @Router			/api/v1/generate/pdf [post]
func PostPdf(pdfDispatcher *pdf.PdfDispatcher) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		log.Println("🔄 Handling POST /generate request")

		req, parseErr := utils.ParseRequest[GeneratePDFRequest](request)
		if parseErr != nil {
			log.Println("❌ Error parsing request:", parseErr)
			http.Error(response, "Invalid input", http.StatusBadRequest)
			return
		}

		pdfData, generateErr := pdfDispatcher.GenerateFromUrl("pdf", req.Template, req.Variables)
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
