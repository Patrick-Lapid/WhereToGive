package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
)

type User struct {
	Userid            string `gorm:"type:text" json: "user_id"`
	DisplayName       string `gorm:"type:text" json: "display_name"`
	FavoriteCharities []int  `gorm:"type:integer[]" json:"favorites"`
}

func GetUser(userid string) User {
	var user User
	err := database.DB.First(&user, "userid = ?", userid).Error
	if err != nil {
		return User{}
	}
	return user
}

func CreateUser(user User) {
	result := database.DB.Create(&user)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
}

func UpdateUser() {

}

func DeleteUser(userid string) bool {
	var user User
	result := database.DB.Where("userid = ?", userid).Delete(&user)
	if result.RowsAffected == 0 {
		// Send error saying no users found
	}
	if result.Error != nil {
		// Send error
	}
	return true
}

func ToggleFav(userid int, charid int) bool { //should be string or int?
	var user User
	err := database.DB.Find(&user, userid).Error
	if err == nil {
		return false
	}

	favorites := user.FavoriteCharities

	for i, fav := range favorites {
		if fav == charid {
			favorites = append(favorites[:i], favorites[i+1:]...)
			user.FavoriteCharities = favorites
			err = database.DB.Save(&user).Error
			if err == nil {
				return true
			}
			return true
		}
	}
	//If matching not found, add
	favorites = append(favorites[:], charid)
	user.FavoriteCharities = favorites
	err = database.DB.Save(&user).Error
	if err == nil {
		return false
	}
	return false
}

func GetFav(userid string) []int {
	print(userid)
	var user User
	database.DB.Raw("SELECT * FROM users WHERE userid = ?", userid).Scan(&user)
	//err2 := database.DB.Find(&user, userid).Error
	/*if err2 != nil {

		return user.FavoriteCharities
	}*/
	return user.FavoriteCharities
}
