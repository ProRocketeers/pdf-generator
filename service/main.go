package main

import (
	"log"

	"pdf-generator/api"
	"pdf-generator/infrastracture"
)

// Version is the version of the application.
// It is set during the build process using the -ldflags flag.
var Version = "dev"

func main() {
	log.Printf("Hello from PDF Generator service %v", Version)

	config, configErr := infrastracture.LoadConfig(Version)
	if configErr != nil {
		log.Printf("🔥 Error loading config: %v", configErr)
		log.Fatal(configErr)
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
