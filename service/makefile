.PHONY: run
run:
	@echo "Running the application..."
	@go run main.go

.PHONY: gen-swagger
gen-swagger:
	@echo "Generating Swagger docs..."
	@swag init -g main.go && swag fmt
	@echo "Swagger docs generated successfully."
