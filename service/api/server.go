package api

import (
	"fmt"
	"log"
	"net/http"
	"pdf-generator/api/routes"
	"pdf-generator/docs"
	"pdf-generator/infrastracture"

	"github.com/go-chi/chi/v5"
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

	// Set up swagger
	docs.SwaggerInfo.Title = "PDF Generator API"
	docs.SwaggerInfo.Description = "This is a PDF Generator API server."
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Host = fmt.Sprintf("%s:%s", config.Host, config.Port)
	docs.SwaggerInfo.Schemes = []string{"http", "https"}
	docs.SwaggerInfo.Version = config.Version

	// Set up the router
	server.Route("/api", func(r chi.Router) {
		r.Route("/v1", func(r chi.Router) {
			r.Get("/swagger", func(w http.ResponseWriter, r *http.Request) {
				http.Redirect(w, r, "/api/v1/swagger/index.html", http.StatusMovedPermanently)
			})
			r.Get("/swagger*", httpSwagger.WrapHandler)

			r.Get("/health", routes.GetHealth)
			r.Post("/generate", routes.PostGenerate)
		})
	})

	return server, nil
}

func StartServer(config *infrastracture.Config, server *Server) error {
	// Start the server
	log.Printf("🚀 Starting server at http://%s:%s", config.Host, config.Port)
	return http.ListenAndServe(":"+config.Port, server)
}
