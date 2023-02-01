package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/routers"
)

func main() {
	fmt.Println("Starting server on port 8000")

	router := mux.NewRouter()

	routers.AddUserRouter(router)

	log.Fatal(http.ListenAndServe(":8000", router))
}
