package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/routers"
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
)

func main() {
	fmt.Println("Starting server on port 8000")

	database.DB = database.InitDB()

	router := mux.NewRouter()
	
	routers.AddUserRouter(router)
	routers.AddCharityRouter(router)

	log.Fatal(http.ListenAndServe(":8000", router))
}
