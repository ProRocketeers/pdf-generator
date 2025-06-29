# Frontend

## Overview

The frontend of the application is built using React with Next.js, utilizing the App Router for routing and server components for better performance. The application leverages Vite for fast development and build processes.

The frontend is designed to be responsive and user-friendly, with a focus on providing a seamless experience across different devices. The application uses Material-UI (MUI) for styling and components, ensuring a modern and consistent look and feel.

| Tech          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| React         | JavaScript library for building user interfaces.                          |
| Next.js      | React framework for server-rendered applications.                        |
| App Router    | Routing solution for Next.js applications.                              |
| Server Components | Feature of Next.js that allows for server-side rendering of components. |
| Suspense      | React feature that allows for asynchronous rendering of components.     |
| React Hook Form | Library for managing form state and validation in React applications.   |
| Zod           | TypeScript-first schema declaration and validation library.             |
| MUI           | Popular React UI framework that provides pre-designed components.      |
| TypeScript    | Superset of JavaScript that adds static typing.                          |

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## CI CD

### Dockerfile

This project includes a Dockerfile for building and running the application in a containerized environment. The Dockerfile is set up to use multi-stage builds for efficient image creation.

```shell
docker build -t pdf-generator-frontend .
```

Run the Docker container with the following command:

```shell
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e API_URL=http://host.docker.internal:3001 \
  pdf-generator-frontend
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
