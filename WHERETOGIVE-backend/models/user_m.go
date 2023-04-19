package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	pq "github.com/lib/pq"
)

type User struct {
	Userid      string        `gorm:"type:text" json: "user_id"`
	DisplayName string        `gorm:"type:text" json: "display_name"`
	Favorites   pq.Int64Array `gorm:"type:integer[]" json:"favorites"`
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

func ToggleFav(userid string, charid int) bool { //should be string or int?
	var user User
	//database.DB.Raw("SELECT * FROM users WHERE userid = ?", userid).Scan(&user)
	err := database.DB.Where("userid = ?", userid).First(&user).Error
	if err != nil {
		return false
	}

	favorites := user.Favorites

	for i, fav := range favorites {
		if int(fav) == charid {
			favorites = append(favorites[:i], favorites[i+1:]...)
			//user.Favorites = favorites
			//err := database.DB.Save(&user).Error
			database.DB.Exec("UPDATE users SET favorites = ? WHERE userid = ?", favorites, userid)
			print("? removed!", charid)
			if err == nil {
				return true
			}
			return true
		}
	}
	//If matching not found, add
	favorites = append(favorites[:], int64(charid))
	//database.DB.Raw("UPDATE users SET favorites = ? WHERE userid = ?", favorites, userid)
	database.DB.Exec("UPDATE users SET favorites = ? WHERE userid = ?", favorites, userid)
	//user.Favorites = favorites
	//err = database.DB.Save(&user).Error

	return false
}

func GetFav(userid string) []int64 {
	print(userid)
	var user User
	database.DB.Raw("SELECT * FROM users WHERE userid = ?", userid).Scan(&user)
	//err2 := database.DB.Find(&user, userid).Error
	/*if err2 != nil {

		return user.FavoriteCharities
	}*/
	print(user.Favorites)
	return user.Favorites
}
