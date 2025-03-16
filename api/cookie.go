package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type RequestBody struct {
	ExpiryDays int `json:"expiryDays"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var reqBody RequestBody
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	expiryDays := reqBody.ExpiryDays
	if expiryDays == 0 {
		expiryDays = 7 // Default if not provided
	}

	expiry := time.Now().Add(time.Hour * 24 * time.Duration(expiryDays))
	now := time.Now().Format(time.RFC3339)

	cookie := http.Cookie{
		Name:     "currentTime",
		Value:    now,
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		Expires:  expiry,
	}

	http.SetCookie(w, &cookie)

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Cookie 'currentTime' set to: %s, expires in %d days", now, expiryDays)
}
