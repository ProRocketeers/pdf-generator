# 🛠️ Použij oficiální Go image pro build
FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g main.go && swag fmt

RUN make build

# 🚀 Použij lehčí image pro běh aplikace
FROM debian:bookworm-slim AS runtime

ARG PORT
ARG HOST
ARG BASE_PATH

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ruby \
    ruby-dev \
    build-essential \
    ca-certificates \
    chromium \
 && rm -rf /var/lib/apt/lists/*

# Nejnovější verze, podpora rozšíření (např. PDF, rouge)
# Potřebuje ruby, ruby-dev, build-essential
RUN gem install asciidoctor asciidoctor-pdf

ENV PORT=${PORT}
ENV HOST=${HOST}
ENV BASE_PATH=${BASE_PATH}

COPY --from=builder /app/bin/pdf-generator .

RUN groupadd --system app && useradd --system --gid app --home /app app \
 && mkdir -p /app/temp \
 && chown -R app:app /app

USER app

EXPOSE ${PORT}

CMD ["./pdf-generator"]
