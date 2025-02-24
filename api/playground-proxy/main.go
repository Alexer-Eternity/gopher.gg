package handler

import (
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
	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	formData := url.Values{}
	formData.Set("version", "2")
	formData.Set("body", string(reqBody))

	playgroundURL := "https://go.dev/_/compile?backend="
	resp, err := http.Post(playgroundURL, "application/x-www-form-urlencoded", strings.NewReader(formData.Encode()))
	if err != nil {
		http.Error(w, "Failed to forward request to Go Playground", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response from Go Playground", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)

}
