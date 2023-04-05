package models

import (
	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/database"
	"gorm.io/datatypes"
)

type Donation struct {
	Userid      	 string        	`gorm:"type:text" json: "logo_url"`
	Charityid        int       		`json: "charityid"`
	Amount			 int			`json: "amount"`
	TransDate 	 	 datatypes.Date `json: "trans_date"`
}

type DetailedDonation struct {
	Name      		 string         `json: "name"`
	LogoURL          string         `gorm:"type:text" json: "logo_url"`
	Amount			 int			`json: "amount"`
	TransDate 	 	 datatypes.Date `json: "trans_date"`
}

type TotalAmount struct {
	TotalAmount int `json: "total_amount"`
}

func GetAllDonationsByUser(userid string) []DetailedDonation{
	var donations []DetailedDonation
	result := database.DB.Raw(`SELECT d.amount, d.trans_date, c.name, c.logo_url 
							   FROM donations d 
							   INNER JOIN charities c ON d.charityid = c.id
							   WHERE d.userid = ?
							   ORDER BY d.trans_date DESC`, userid).Scan(&donations)
	if result.Error != nil {
		// Send error
	}
	return donations
}

func CreateDonation(donation Donation) {
	result := database.DB.Create(&donation);
	if result.RowsAffected == 0 {
		// Failed to create donation
	}
	if result.Error != nil {
		// Send error
	}
}

func GetTotalAmountByUser(userid string) TotalAmount{
	var total TotalAmount
	result := database.DB.Raw("SELECT SUM(amount) total_amount FROM donations WHERE userid = ?", userid).Scan(&total)
	if result.Error != nil {
		// Send error
	}
	return total
}

