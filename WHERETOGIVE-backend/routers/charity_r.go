package routers

import (
	"github.com/gorilla/mux"
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
)

// Charity routes
func AddCharityRouter(router *mux.Router) {
    router.HandleFunc("/api/charities", controllers.GetCharities).Methods("GET")
	router.HandleFunc("/api/charities/", controllers.GetCharitiesByTag).Methods("GET")
	router.HandleFunc("/api/charities/{id}", controllers.GetCharity).Methods("GET")
}