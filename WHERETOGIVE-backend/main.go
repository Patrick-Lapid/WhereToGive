package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/routers"
	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Starting server on port 8000")

	router := mux.NewRouter()

	routers.AddUserRouter(router)

	log.Fatal(http.ListenAndServe(":8000", router))
}
