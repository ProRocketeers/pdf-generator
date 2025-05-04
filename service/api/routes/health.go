package routes

import "net/http"

// @Summary		Health check
// @Description	Check if the service is running
// @Tags			System
// @Success		200	{object}	nil	"Service is healthy"
// @Failure		500	{object}	nil	"Service is not healthy"
// @Router			/health [get]
func GetHealth(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusOK)
	response.Write([]byte("OK"))
}
