package routers

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
	"github.com/gorilla/mux"
)

// Recurring Donations Router
func AddRecurringDonationsRouter(router *mux.Router) {
	router.HandleFunc("/api/recurringdonations/getdonations/{userID}", controllers.GetRecurringDonationsByUser).Methods("GET")
	router.HandleFunc("/api/recurringdonations/add", controllers.CreateRecurringDonation).Methods("POST")
	router.HandleFunc("/api/reccuringdonations/delete/{donationID}", controllers.DeleteRecurringDonation).Methods("DELETE")
	router.HandleFunc("/api/reccuringdonations/update", controllers.UpdateRecurringDonation).Methods("PUT")
}