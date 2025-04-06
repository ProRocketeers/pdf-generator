package routes

import "net/http"

// @Summary		Health check
// @Description	Check if the service is running
// @Tags			System
// @Success		200	{string}	string	"Service is healthy"
// @Failure		500	{string}	string	"Service is not healthy"
// @Router			/api/v1/health [get]
func GetHealth(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusOK)
	response.Write([]byte("OK"))
}
