package main

import (
	"net/http"

	"backend/controllers"
	"backend/initializers"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	_ "github.com/lib/pq"
)

func main() {
	// Create a new router instance
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})
	// Custom CORS configuration
	corsMiddleware := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}), // or use "*" for all origins
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With"}), // Add other headers needed by your requests
		handlers.AllowCredentials(),
	)

	// Register and Login route
	router.HandleFunc("/register", controllers.RegisterHandler).Methods("POST")
	router.HandleFunc("/login", controllers.LoginHandler).Methods("POST")

	// Start the server
	http.ListenAndServe(":8080", corsMiddleware(router))
}
