package routers

import (
	"github.com/gorilla/mux"
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/controllers"
)

// User route
func AddUserRouter(router *mux.Router) {
    router.HandleFunc("/api/user/{id}", controllers.GetUser).Methods("GET")
    router.HandleFunc("/api/user", controllers.CreateUser).Methods("POST")
    router.HandleFunc("/api/user/{id}", controllers.UpdateUser).Methods("PUT")
    router.HandleFunc("/api/user/{id}", controllers.DeleteUser).Methods("DELETE")
}