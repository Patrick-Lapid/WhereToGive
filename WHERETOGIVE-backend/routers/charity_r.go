package routers

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
	"github.com/gorilla/mux"
)

// Charity routes
func AddCharityRouter(router *mux.Router) {
	router.HandleFunc("/api/charities", controllers.GetCharities).Methods("GET")
	router.HandleFunc("/api/charities/", controllers.GetCharitiesByTag).Methods("GET").Queries("tag", "{tags}")
	router.HandleFunc("/api/charities/search/", controllers.GetCharitiesBySearch).Methods("GET").Queries("terms", "{terms}")
	router.HandleFunc("/api/charities/{id}", controllers.GetCharity).Methods("GET")
	router.HandleFunc("/api/tags", controllers.GetAllTags).Methods("GET")
}
