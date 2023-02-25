package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/routers"
)

func main() {
	fmt.Println("Starting server on port 8000")

	database.DB = database.InitDB()

	router := mux.NewRouter()
	
	routers.AddUserRouter(router)
	routers.AddCharityRouter(router)

	// all origins accepted for GET and POST 
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowCredentials: true,
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})
	corsRouter := c.Handler(router)

	log.Fatal(http.ListenAndServe(":8000", corsRouter))
}
