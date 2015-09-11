package golang

import (
    "net/http"
)

func init() {
    http.HandleFunc("/v1/questions", questions)
}

func questions(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    fmt.Fprint(w, "Hello, world!")
    return
}