APP_NAME = service

# Získání posledního tagu pro aplikaci, např. service/v1.2.3 => v1.2.3
VERSION = $(shell git tag --sort=-creatordate | grep "^$(APP_NAME)/v" | head -n 1 | cut -d/ -f2)
VERSION := $(if $(VERSION),$(VERSION),dev)

LDFLAGS = -X 'main.Version=$(VERSION)'

.PHONY: build
build:
	@echo "🔨 Building ${APP_NAME} with version ${VERSION}"
	@go build -ldflags "$(LDFLAGS)" -o ./bin/
	@echo "✅ Build completed"

.PHONY: run-build
run-build:
	@echo "Run last build..."
	@./bin/pdf-generator

.PHONY: run
run:
	@echo "Running the application..."
# @go run main.go
# Run with air for hot reloading
	@air

.PHONY: gen-swagger
gen-swagger:
	@echo "Generating Swagger docs..."
	@swag init -g main.go && swag fmt
	@echo "Swagger docs generated successfully."
