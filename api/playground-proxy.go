package handler

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"strings"
)

type Request struct {
	Version string `json:"version"`
	Body    string `json:"body"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var reqData Request
	err := json.NewDecoder(r.Body).Decode(&reqData)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	goCode := reqData.Body
	if goCode == "" {
		http.Error(w, "Go code is missing", http.StatusBadRequest)
		return
	}

	formData := url.Values{}
	formData.Set("version", reqData.Version)
	formData.Set("body", goCode)

	playgroundURL := "https://go.dev/_/compile?backend="
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
