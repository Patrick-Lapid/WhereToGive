package controllers

import (
	"fmt"
	"net/http"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	// Call get user from User model
	fmt.Println("GetUser")
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Call create user from User model
	fmt.Println("CreateUser")
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Call update user from User model
	fmt.Println("UpdateUser")
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// Call delete user from User model
	fmt.Println("DeleteUser")
}