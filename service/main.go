package main

import (
	"log"

	"pdf-generator/api"
	"pdf-generator/utils"
)

// Version is the version of the application.
// It is set during the build process using the -ldflags flag.
var Version = "dev"

//	@title			PDF Generator API
//	@version		1.0
//	@description	This is a PDF Generator API server.

// @BasePath	/api/v1
func main() {
	log.Printf("Hello from PDF Generator service %v", Version)

	utils.LoadEnvs()

	port := utils.GetEnv("PORT", "8080")
	host := utils.GetEnv("HOST", "localhost")
	timeout := 1000 // utils.GetEnv("TIMEOUT", "1000") // Cast to int is needed

	config := &api.Config{
		Port:    port,
		Host:    host,
		Timeout: timeout,
	}

	server, prepErr := api.PrepareServer(config)
	if prepErr != nil {
		log.Printf("🔥 Error preparing server: %v", prepErr)
		log.Fatal(prepErr)
	}

	startErr := api.StartServer(config, server)
	if startErr != nil {
		log.Printf("🔥 Error starting server: %v", startErr)
		log.Fatal(startErr)
	}
}
