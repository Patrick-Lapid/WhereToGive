package models

import (
	"gorm.io/datatypes"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
)

type User struct {
	ID          int            `json: "id"`
	Userid      int            `json: "userID"`
	FirstName   string         `json: "first_name"`
	LastName    string         `json: "last_name"`
	City        string         `json: "city"`
	State       string         `json: "state"`
	DateCreated datatypes.Date `json: "date_created"`
}

func GetUser(userid int) User {
	var users User
	database.DB.First(&users, "userid = ?", userid)
	return users
}

func CreateUser() {

}

func UpdateUser() {

}

func DeleteUser(userid int) {
	var users User
	database.DB.First(&users, "userid = ?", userid)
	database.DB.Where("userid = ?", userid).Delete(&users)
}
