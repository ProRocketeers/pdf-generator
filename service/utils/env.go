package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvs() {
	// Load environment variables from .env file
	envError := godotenv.Load()
	if envError != nil {
		if os.IsNotExist(envError) {
			log.Println("⚠️  .env file not found, skipping...")
		} else {
			log.Printf("⚠️  Failed to load .env file: %v", envError)
		}
	} else {
		log.Println("🧪 Environment variables loaded successfully")
	}
}

func GetEnv(key string, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Printf("⚠️  Environment variable %s not found", key)
		return defaultValue
	}
	return value
}
