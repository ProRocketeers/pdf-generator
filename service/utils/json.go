package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func ParseRequest[T any](request *http.Request) (T, error) {
	var result T
	if err := json.NewDecoder(request.Body).Decode(&result); err != nil {
		return result, fmt.Errorf("failed to parse request body: %w", err)
	}
	return result, nil
}
