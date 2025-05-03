package api

import (
	"fmt"
	"log"
	"net/http"
	"pdf-generator/api/routes"
	"pdf-generator/docs"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

func StartServer(config *Config) error {
	const host = "localhost"

	r := chi.NewRouter()

	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Host = fmt.Sprintf("%s:%s", host, config.Port)
	docs.SwaggerInfo.Schemes = []string{"http", "https"}
	docs.SwaggerInfo.Version = "1.0"

	// Set up middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Timeout(time.Duration(config.Timeout) * time.Second))

	// Set up the router
	r.Route("/api", func(r chi.Router) {
		r.Route("/v1", func(r chi.Router) {
			r.Get("/swagger", func(w http.ResponseWriter, r *http.Request) {
				http.Redirect(w, r, "/api/v1/swagger/index.html", http.StatusMovedPermanently)
			})
			r.Get("/swagger*", httpSwagger.WrapHandler)

			r.Get("/health", routes.GetHealth)
			r.Post("/generate", routes.PostGenerate)
		})
	})

	// Start the server
	log.Printf("🚀 Starting server at http://%s:%s", host, config.Port)
	return http.ListenAndServe(":"+config.Port, r)
}
