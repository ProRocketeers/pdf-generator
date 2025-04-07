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

## Run the service

### Move to the service directory

```shell
cd service
```

### Install dependencies

```shell
go mod tidy
```

### generate swagger

```shell
make gen-swagger
```

### Run

```shell
make run
```

see swagger at <localhost:8081/api/v1/swagger/index.html>

### Test

TBD
