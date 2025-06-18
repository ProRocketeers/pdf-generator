package infrastracture

import (
	"pdf-generator/utils"
	"strconv"
	"strings"
)

func LoadConfig(version string) (*Config, error) {
	utils.LoadEnvs()

	port := utils.GetEnv("PORT", "8080")
	host := utils.GetEnv("HOST", "localhost")
	basePath := utils.GetEnv("BASE_PATH", "")
	timeoutStr := utils.GetEnv("TIMEOUT", "5000")
	corsOriginsStr := utils.GetEnv("CORS_ORIGINS", "localhost")

	// Convert timeout to integer
	timeout, err := strconv.Atoi(timeoutStr)
	if err != nil {
		return nil, err
	}

	// Parse DEV environment variable
	dev, err := strconv.ParseBool(utils.GetEnv("DEV", "false"))
	if err != nil {
		return nil, err
	}
	// Split CORS origins into a slice
	cors := strings.Split(corsOriginsStr, ",")

	return &Config{
		Version:     version,
		Port:        port,
		Host:        host,
		BasePath:    basePath,
		Timeout:     timeout,
		CorsOrigins: cors,
		Dev:         dev,
	}, nil
}
