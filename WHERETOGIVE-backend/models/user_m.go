package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
)

type User struct {
	Userid      	 string         `gorm:"type:text" json: "user_id"`
	DisplayName      string         `gorm:"type:text" json: "display_name"`
}

func GetUser(userid string) User {
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

func DeleteUser(userid string) {
	var user User
	result := database.DB.Where("userid = ?", userid).Delete(&user)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}
