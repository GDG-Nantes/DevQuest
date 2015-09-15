package devquest

import (
    "fmt"
    "net/http"
)

func init() {
    http.HandleFunc("/api/v1/questions", questions)
    http.HandleFunc("/api/v1/anwser", anwser)
}

func questions(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    jsonQuestion := ` 
    {
    	"unsuper":"json"
    }
    `
    fmt.Fprint(w, jsonQuestion)
}

func anwser(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    fmt.Fprint(w, "Hello World")
}