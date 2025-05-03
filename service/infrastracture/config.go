package infrastracture

import (
	"pdf-generator/utils"
	"strconv"
)

func LoadConfig(version string) (*Config, error) {
	utils.LoadEnvs()

	port := utils.GetEnv("PORT", "8080")
	host := utils.GetEnv("HOST", "localhost")
	timeoutStr := utils.GetEnv("TIMEOUT", "1000")

	// Convert timeout to integer
	timeout, err := strconv.Atoi(timeoutStr)
	if err != nil {
		return nil, err
	}

	return &Config{
		Version: version,
		Port:    port,
		Host:    host,
		Timeout: timeout,
	}, nil
}
