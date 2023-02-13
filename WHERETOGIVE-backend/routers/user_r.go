package routers

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
	"github.com/gorilla/mux"
)

// User routes
func AddUserRouter(router *mux.Router) {
	router.HandleFunc("/api/users/{userID}", controllers.GetUser).Methods("GET")
	router.HandleFunc("/api/users", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{userID}", controllers.UpdateUser).Methods("PUT")
	router.HandleFunc("/api/users/{userID}", controllers.DeleteUser).Methods("DELETE")
}
