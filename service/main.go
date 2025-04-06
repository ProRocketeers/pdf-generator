package main

import (
	"log"

	"pdf-generator/api"
	"pdf-generator/utils"
)

//	@title			PDF Generator API
//	@version		1.0
//	@description	This is a PDF Generator API server.

// @BasePath	/api/v1
func main() {
	utils.LoadEnvs()

	port := utils.GetEnv("PORT", "8080")
	timeout := 10 // utils.GetEnv("TIMEOUT", "10") // Cast to int is needed

	config := &api.Config{Port: port, Timeout: timeout}

	err := api.StartServer(config)
	if err != nil {
		log.Printf("🔥 Error starting server: %v", err)
		log.Fatal(err)
	}
}
