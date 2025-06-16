package api

import (
	"fmt"
	"log"
	"net/http"
	ourMiddleware "pdf-generator/api/middleware"
	"pdf-generator/api/routes"
	api_v1_generate "pdf-generator/api/routes/api/v1/generate"
	"pdf-generator/docs"
	"pdf-generator/domain/pdf"
	"pdf-generator/infrastracture"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

// Server is a type alias for *http.Server
type Server = chi.Mux

func PrepareServer(config *infrastracture.Config) (*Server, error) {
	if config == nil {
		return nil, fmt.Errorf("config cannot be nil")
	}
	if config.Host == "" || config.Port == "" {
		return nil, fmt.Errorf("host and port must be specified in the config")
	}

	server := chi.NewRouter()

	// Set up middleware
	server.Use(middleware.RequestID)
	server.Use(middleware.RealIP)
	server.Use(middleware.Logger)
	server.Use(middleware.Recoverer)
	server.Use(middleware.Timeout(time.Duration(config.Timeout)))

	server.Use(cors.Handler(cors.Options{
		AllowedOrigins: config.CorsOrigins,
	}))

	rateLimiter := &ourMiddleware.FixedRateLimiter{
		Enabled:  true,
		Limit:    10,
		Duration: 5 * time.Second,
	}
	server.Use(ourMiddleware.RateLimiter(rateLimiter))

	// Set up swagger
	docs.SwaggerInfo.Title = "PDF Generator API"
	docs.SwaggerInfo.Description = "This is a PDF Generator API server."
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Host = fmt.Sprintf("%s:%s", config.Host, config.Port)
	docs.SwaggerInfo.Schemes = []string{"http", "https"}
	docs.SwaggerInfo.Version = config.Version

	// Set up the router
	server.Get("/health", routes.GetHealth)
	server.Get("/metrics", routes.GetMetrics(config))
	server.Get("/swagger*", httpSwagger.WrapHandler)
	server.Get("/swagger", func(w http.ResponseWriter, r *http.Request) {
		originalPath := r.Header.Get("X-Original-Path")
		if originalPath == "" {
			originalPath = r.URL.Path
		}
		http.Redirect(w, r, originalPath+"/index.html", http.StatusMovedPermanently)
	})
	server.Route("/api", func(r chi.Router) {
		r.Route("/v1/generate", func(r chi.Router) {
			// TODO: Get service from params
			pdfDispatcher := pdf.NewPdfDispatcher()
			// r.Post("/adoc", api_v1.PostGenerate(pdfDispatcher))
			r.Post("/adoc", api_v1_generate.PostAdoc(pdfDispatcher))
			r.Post("/html", api_v1_generate.PostHtml(pdfDispatcher))
		})
	})

	return server, nil
}

func StartServer(config *infrastracture.Config, server *Server) error {
	// Start the server
	log.Printf("🚀 Starting server at http://%s:%s", config.Host, config.Port)
	return http.ListenAndServe(":"+config.Port, server)
}
