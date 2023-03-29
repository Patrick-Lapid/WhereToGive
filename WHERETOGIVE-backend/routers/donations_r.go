package routers

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
	"github.com/gorilla/mux"
)

// Donations Router
func AddDonationsRouter(router *mux.Router) {
	router.HandleFunc("/api/donations/getdonations/{userID}", controllers.GetDonationsByUser).Methods("GET")
	router.HandleFunc("/api/donations/add", controllers.CreateDonation).Methods("POST")
}