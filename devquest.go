package devquest

import (
    "fmt"
    "net/http"
)

func init() {
    http.HandleFunc("/api/v1/questions", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    fmt.Fprint(w, "Hello, world!")
    return
}