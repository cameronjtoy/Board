package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"backend/initializers"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterInfo struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}


// LoginHandler handles the login route
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	// Get the username and password from the request body
	var registerInfo RegisterInfo
	err := json.NewDecoder(r.Body).Decode(&registerInfo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new user
	user, err := CreateUser(registerInfo.Username, registerInfo.Email, registerInfo.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Write the token to the response
	w.WriteHeader(http.StatusOK)
	fmt.Println("User created!")
	json.NewEncoder(w).Encode(user)

}

func CreateUser(username string, email string, password string) (User, error) {
	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return User{}, err
	}

	// Create a new user with the hashed password
	user := User{
		Username: username,
		Email:    email,
		Password: string(hashedPassword),
	}

	// Insert the user into the database
	err = user.Create()
	if err != nil {
		return User{}, err
	}

	return user, nil
}

// Insert User into database
func (user *User) Create() error {
	// Insert the user into the database
	consStr := "postgres://fl0user:uVw0q2WBhPHj@ep-fancy-dream-00146834.us-east-2.aws.neon.fl0.io:5432/Board?sslmode=require"
	db, err := sql.Open("postgres", consStr)

	fmt.Println("Connected to database!")

	db.QueryRow("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", user.Username, user.Password, user.Email)

	if err != nil {
		return err
	}

	return nil
}
