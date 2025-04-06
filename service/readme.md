# How to run the service

## Prerequisites

install go <https://go.dev/doc/install>

```shell
go version
```

## Run the service

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
