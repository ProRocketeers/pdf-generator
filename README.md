# 🚀 Pro Labs - PDF Generator

🧾 A collection of applications designed to generate PDF documents from pre-prepared templates as part of the 🚀 **Pro Labs** initiative.

## What is Pro Labs?

**Pro Labs** is a developer initiative focused on creating useful tools for other developers. The goal is to build a catalog of practical solutions that help with everyday software development activities.

The main motivation is to learn something new during the development process while creating tools that simplify or automate work processes. For data processing tools (like PDF Generator or Case Converter), the key added value is **enhanced security**, as we have processing under our own control instead of relying on external online services.

---

## Project Structure

The monorepo contains three main components:

```bash
pdf-generator/
├── 🎨 frontend/          # Next.js web interface
├── ⚙️ backend/           # NestJS API server for data management
└── 🔧 service/           # Go service for PDF generation
```

### Technologies

| Component | Technologies | Description |
|------------|------------|-------|
| **Frontend** | Next.js, TypeScript, MUI | Web interface for template management |
| **Backend** | NestJS, PostgreSQL, MikroORM | REST API for data management |
| **Service** | Go | Service for PDF generation |

## ⚙️ Features

- **📄 PDF Generation** from templates (AsciiDoc, HTML, PDF Forms)
  <!-- TODO: - **📑 Bulk PDF generation** import data from .csv files -->
<!-- TODO: - **🗂️ Template management** - creating, editing and deleting templates via web interface -->
- **📊 REST API** with complete Swagger documentation
- **🐳 Docker ready** - prepared for containerization

## ▶️ Development

### Quick Start

To quickly start all components, use the following commands:

#### Go Service

If you have all prerequisites met (defined in ./service/README.md), just run:

```bash
cd service
make run
```

After starting the service, it will be available at [http://localhost:8081/swagger](http://localhost:8081/swagger).

#### Backend

If you have all prerequisites met (defined in ./backend/README.md), just run:

```bash
cd backend
pnpm run start:dev
```

After starting the backend, Swagger documentation will be available at [http://localhost:3001/swagger](http://localhost:3001/swagger).

#### Frontend

If you have all prerequisites met (defined in ./frontend/README.md), just run:

```bash
cd frontend
pnpm run dev
```

After starting the frontend application, it will be available at [http://localhost:3000](http://localhost:3000).

### Detailed Guides

Each component has its own README with detailed instructions:

- 📚 **[Service README](./service/README.md)** - Go service for PDF generation
- 📚 **[Backend README](./backend/README.md)** - API server, database, migrations
- 📚 **[Frontend README](./frontend/README.md)** - web interface, styling

### API Documentation

After starting the **service**, documentation is available at [http://localhost:8081/swagger](http://localhost:8081/swagger)

After starting the **backend**, Swagger documentation is available at [http://localhost:3001/swagger](http://localhost:3001/swagger)

## 📄 License

MIT –
