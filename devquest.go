package devquest

import (
    "fmt"
    "net/http"
    "log"
    "encoding/json"
    "io/ioutil"
    "os"
)

type jsonobject struct {
    SPREADSHEET_KEY string
}


var jsontype jsonobject

func init() {
    http.HandleFunc("/api/v1/questions", questions)
    http.HandleFunc("/api/v1/anwser", anwser)
    file, e := ioutil.ReadFile("./credentials.json")
    if e != nil {
        log.Printf("File error: %v\n", e)
        os.Exit(1)
    }
    log.Print(string(file))

    
    e= json.Unmarshal(file, &jsontype)   
    if e!=nil{
        log.Print("Error:",e)
    }
    log.Print(jsontype)
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
    fmt.Fprint(w, jsontype)
}

func anwser(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    fmt.Fprint(w, "Hello World")
    fmt.Fprint(w, jsontype.SPREADSHEET_KEY);
}