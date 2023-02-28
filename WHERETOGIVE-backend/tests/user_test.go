package tests

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"testing"

	"github.com/Patrick-Lapid/WhereToGive/WHERETOGIVE-backend/models"

	"github.com/stretchr/testify/assert"
)

func TestGetUser(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/1")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }

	assert.Equal(t, resp.StatusCode, http.StatusOK, "The status of this request should be 200 (OK)")

	var user models.User;
	json.NewDecoder(resp.Body).Decode(&user)
	assert.NotEqual(t, user.FirstName, "", "First name not found")
	assert.NotEqual(t, user.LastName, "", "Last name not found")
	assert.NotEqual(t, user.City, "", "City not found")
	assert.NotEqual(t, user.State, "", "State not found")
	assert.NotEqual(t, user.Userid, 0, "Userid not found")
}

func TestGetUserNotFound(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/400")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }
	body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }
    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusNotFound, "The status of this request should be 404 (Not Found)")
	assert.Equal(t, responseString, "User not found", "User should not be found if not in database")
}

func TestGetUserInvalidParameterType(t *testing.T) {
	resp, errGetting := http.Get("http://localhost:8000/api/users/abc")
	if errGetting != nil {
        t.Fatalf("Couldn't make request: %v\n", errGetting)
    }
	body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }
    responseString := string(body)

	assert.Equal(t, resp.StatusCode, http.StatusBadRequest, "The status of this request should be 400 (Bad Request)")
	assert.Equal(t, responseString, "userID must be an integer", "Response for string type parameter should be (userID must be an integer)")
}
