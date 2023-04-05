package tests

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"

	"github.com/stretchr/testify/assert"
)

func TestCreateDonation(t *testing.T) {
	donation := &models.Donation{
		Userid: "test",
		Charityid: 843,
		Amount: 10,
	}
	
	postBody := new(bytes.Buffer)
	json.NewEncoder(postBody).Encode(donation)

	resp, errGetting := http.Post("http://localhost:8000/api/donations/add", "application/json", postBody)
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("Couldn't read request: %v\n", err)
    }

    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")
	assert.Equal(t, responseString, "Successfully created donation", "Response for creation should be (Successfully created user)")
	resp.Body.Close()
}

func TestGetDonationsByUser(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/donations/getdonations/test")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")

	var donations []models.DetailedDonation;
	json.NewDecoder(resp.Body).Decode(&donations)
	assert.NotEqual(t, donations[0].Name, "", "Name not found")
	assert.NotEqual(t, donations[0].LogoURL, "", "Charityid not found")
	assert.NotEqual(t, donations[0].Amount, 0, "Amount is 0")
	resp.Body.Close()
}


func TestGetUserTotalAmount(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/donations/getamount/test")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")

	var total models.TotalAmount;
	json.NewDecoder(resp.Body).Decode(&total)
	assert.NotEqual(t, total.TotalAmount, 0, "Total donation amount is 0")
	resp.Body.Close()
}
