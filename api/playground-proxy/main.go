package handler

import (
	"bytes"
	"io"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Forward the request body to the Go Playground API
	playgroundURL := "https://go.dev/_/play"
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	resp, err := http.Post(playgroundURL, "application/json", bytes.NewReader(reqBody))
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
