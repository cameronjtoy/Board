package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// LoginHandler handles the login route
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// Get the username and password from the request body
	var loginInfo LoginInfo
	err := json.NewDecoder(r.Body).Decode(&loginInfo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new user
	user, err := GetUser(loginInfo.Username, loginInfo.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Write the token to the response
	w.WriteHeader(http.StatusOK)
	fmt.Println("User logged in!")
	json.NewEncoder(w).Encode(user)
}

func GetUser(username string, password string) (User, error) {
	// Connect to the database
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, pass, dbname))
	if err != nil {
		return User{}, err
	}

	// Query the database
	var user User
	err = db.QueryRow("SELECT username, password FROM users WHERE username=$1", username).Scan(&user.Username, &user.Password)
	if err != nil {
		return User{}, err
	}

	// Compare the password with the hashed password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	fmt.Println(err)
	if err != nil {
		return User{}, err
	}
	fmt.Println("User found!")

	return user, nil
}
