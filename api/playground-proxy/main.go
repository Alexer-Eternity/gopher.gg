package handler

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read the body from the incoming request
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Prepare the form data as application/x-www-form-urlencoded
	// Assuming that the request body contains JSON, you may want to extract fields or convert it to string form
	formData := url.Values{}
	formData.Set("version", "2")
	formData.Set("body", string(reqBody))

	// Forward the request to the Go Playground API with form data
	playgroundURL := "https://go.dev/_/compile?backend=" // Make sure this URL is correct
	resp, err := http.Post(playgroundURL, "application/x-www-form-urlencoded", strings.NewReader(formData.Encode()))
	if err != nil {
		http.Error(w, "Failed to forward request to Go Playground", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read the response from the Go Playground API
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response from Go Playground", http.StatusInternalServerError)
		return
	}

	// Set appropriate headers and return the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}
