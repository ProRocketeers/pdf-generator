# How to run the service

## Prerequisites

install go <https://go.dev/doc/install>

```shell
go version
```

add line to your `~/.bash_profile` or `~/.zshrc`

```text
export PATH=$PATH:$(go env GOPATH)/bin
```

install swaggo

```shell
go install github.com/swaggo/swag/cmd/swag@latest
```

check if swaggo is successfully installed

```shell
swag --version
```

If you want to run the service locally, you need to install the following tools:

AsciiDoc

```shell
brew install asciidoctor
```

Chromium

```shell
brew install chromium --no-quarantine 
```

## Environment Variables

The environment variables required for local development are defined in the `.env.example` file. Copy this file to `.env` and update the values as needed:

```shell
cp .env.example .env
```

Make sure to review and update the variables in the `.env` file to match your local setup.

## Run the service

### Move to the service directory

```shell
cd service
```

### Install dependencies

```shell
go mod tidy
```

### Generate Swagger

```shell
make gen-swagger
```

### Run

```shell
make run
```

See Swagger at <localhost:8081/swagger>

### Test

TBD

## CI CD

### Dockerfile

Build the Docker image for the PDF generator service using the provided Dockerfile. This image can be used to run the service in a containerized environment.

```shell
docker build -t pdf-generator-service .
```

Run the Docker container with the following command:

```shell
docker run -d -p 8081:8081 --env-file .env pdf-generator-service
```
