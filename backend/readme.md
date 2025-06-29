# Backend

## Overview

<!-- nest, posdgre -->

The backend of the application is built using **NestJS**, a progressive **Node.js** framework for building efficient and scalable server-side applications. It is designed to be modular and extensible, allowing for easy integration with various libraries and tools.

The backend uses **PostgreSQL** as the database, providing a robust and reliable data storage solution. The application is designed to be RESTful, following best practices for API design and development.

| Tech          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| NestJS        | Progressive Node.js framework for building efficient and scalable server-side applications. |
| PostgreSQL    | Open-source relational database management system.                         |

## Getting Started

To get started with the backend, follow these steps:

### Prerequisites

Database setup is required before running the backend. Ensure you have PostgreSQL installed and running on your machine or server.

```bash
npx mikro-orm migration:up --config ./src/configs/mikro-orm.config.ts
```

```bash
npx mikro-orm seeder:run --config ./src/configs/mikro-orm.config.ts
```

### Project setup

```bash
$ pnpm install
```

### Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## CI CD

### Dockerfile

The Dockerfile is used to build a Docker image for the backend service. It sets up the environment, installs dependencies, and compiles the application.

```shell
docker build -t pdf-generator-backend .
```

Run the Docker container with the following command:

```shell
docker run -p 3001:3001 \
  -e PORT=3001 \
  -e DB_PORT=5434 \
  -e DB_USER=postgres \
  -e DB_HOST=host.docker.internal \
  -e DB_NAME=pdf-generator \
  -e DB_PASSWORD=secret \
  pdf-generator-backend
```

Replace the environment variable values as needed for your setup.

## API Documentation

<!-- health, getTemplates, getTemplate, createPdf -->

The API documentation is generated using **Swagger** and can be accessed at `/api/v1/swagger`. It provides detailed information about the available endpoints, request and response formats, and authentication methods.

### Health Check

- **Endpoint**: `/api/v1/health`
- **Method**: `GET`
- **Description**: Checks the health of the application.
- **Response**:
  - `200 OK`: The application is healthy.
  - `500 Internal Server Error`: The application is not healthy.
- **Example**:

  ```json
  {
    "status": "ok"
  }
  ```

### Get Templates

- **Endpoint**: `/api/v1/templates`
- **Method**: `GET`
- **Description**: Retrieves a list of available templates.
- **Response**:
  - `200 OK`: A list of templates.
  - `500 Internal Server Error`: An error occurred while retrieving the templates.
- **Example**:

  ```json
  [
    {
      "id": GUID,
      "title": "Invoice",
      "description": "Description of Template 1"
      "templateUrl": "https://example.com/template.adoc",
      "templateType": "adoc",
      "imageUrl": "https://example.com/template.png",
      "variables": [
        {
          "name": "fullName",
          "type": "string",
          "title": "Full Name",
          "default": "John Doe", // optional
        },
      ]
    },
    {
      ...
    }
  ]
  ```

### Get Template  

- **Endpoint**: `/api/v1/templates/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific template by ID.
- **Response**:
  - `200 OK`: The requested template.
  - `404 Not Found`: The template with the specified ID does not exist.
  - `500 Internal Server Error`: An error occurred while retrieving the template.
- **Example**:

  ```json
  {
    "id": GUID,
    "title": "Invoice",
    "description": "Description of Template 1"
    "templateUrl": "https://example.com/template.adoc",
    "templateType": "adoc",
    "imageUrl": "https://example.com/template.png",
    "variables": [
      {
        "name": "fullName",
        "type": "string",
        "title": "Full Name",
        "default": "John Doe", // optional
      },
    ]
  }
  ```

### Create PDF

- **Endpoint**: `/api/v1/pdf`
- **Method**: `POST`
- **Description**: Creates a PDF document based on the specified template and data.
- **Request Body**:
  - `templateId`: The ID of the template to use.
  - `data`: The data to populate the template with.

  ```json
  {
    "templateId": GUID,
    "data": {
      "fullName": "John Doe",
      "address": "123 Main St, City, Country"
    }
  }
  ```

- **Response**:
  - `200 OK`: The generated PDF document.
  - `400 Bad Request`: Invalid request data.
  - `404 Not Found`: The template with the specified ID does not exist.
  - `500 Internal Server Error`: An error occurred while generating the PDF.
