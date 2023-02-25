package models

import (
	"gorm.io/datatypes"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
)

type User struct {
	Userid      int            `json: "userid"  validate:"required"`
	FirstName   string         `json: "first_name"`
	LastName    string         `json: "last_name"`
	City        string         `json: "city"`
	State       string         `json: "state"`
	DateCreated datatypes.Date `json: "date_created"`
}

func GetUser(userid int) User {
	var user User
	err := database.DB.First(&user, "userid = ?", userid).Error
	if err != nil {
		return User{};
	}
	return user
}

func CreateUser(user User) {
	result := database.DB.Create(&user);
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}

func UpdateUser() {

}

func DeleteUser(userid int) {
	var user User
	result := database.DB.Where("userid = ?", userid).Delete(&user)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}
