package devquest

import (
    "fmt"
    "strconv"
    "net/http"
    "appengine"
    "appengine/urlfetch"
    "log"
    "encoding/json"
    "io/ioutil"
    "os"
)

type jsonobject struct {
    SPREADSHEET_KEY string
}

type Value struct{    
    T string `json:"$t"`
}

type Entry struct{
    Title Value `json:"title"`
    Content Value `json:"content"`
}

type Feed struct{
    Entry []Entry `json:"entry"`
}

type SpreadSheet struct {
    Feed Feed `json:"feed"`
    Version string `json:"version"`
}

type Question struct{
    Title string `json:"title"`
    RepA string `json:"repA"`
    RepB string `json:"repB"`
    RepC string `json:"repC"`
    RepD string `json:"repD"`
}

type Questions struct{
    Questions []Question `json:"questions"`
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
    c := appengine.NewContext(r)
    client := urlfetch.Client(c)
    
    url := "https://spreadsheets.google.com/feeds/cells/"+jsontype.SPREADSHEET_KEY+"/od6/public/basic?alt=json";
    //fmt.Fprintf(w, "%s\n", url)
    resp, err := client.Get(url)

    //fmt.Fprintf(w, "HTTP GET returned status %v", resp.Status)
     if err != nil {
        fmt.Fprintf(w, "%s\n", err)
        os.Exit(1)
    } else {
        body, err := ioutil.ReadAll(resp.Body)
        if err != nil {
            fmt.Fprintf(w, "%s\n", err)
            os.Exit(1)
        }
        data := SpreadSheet{}
        json.Unmarshal([]byte(string(body)), &data)
        //str, err := json.Marshal(data);

        //var arrayQuestions []Question;    
        questions := Questions{}
        questions.Questions = make([]Question,(len(data.Feed.Entry)/6));    
        indexQuestion :=0
        indexRow := 1;
        for _,element := range data.Feed.Entry{
            keyA := "A"+strconv.Itoa(indexRow)
            if element.Title.T == keyA{
                question := Question{}
                questions.Questions[indexQuestion] = question
            }else{
                question := &questions.Questions[indexQuestion]                 

                keyB := "B"+strconv.Itoa(indexRow)
                keyC := "C"+strconv.Itoa(indexRow)
                keyD := "D"+strconv.Itoa(indexRow)
                keyE := "E"+strconv.Itoa(indexRow)
                keyF := "F"+strconv.Itoa(indexRow)
                if element.Title.T == keyB{
                    question.Title = element.Content.T;
                }else if element.Title.T == keyC{
                    question.RepA = element.Content.T;
                }else if element.Title.T == keyD{
                    question.RepB = element.Content.T;
                }else if element.Title.T == keyE{
                    question.RepC = element.Content.T;
                }else if element.Title.T == keyF{
                    question.RepD = element.Content.T;
                    indexRow++
                    indexQuestion++
                }
            }

        }
        //fmt.Fprintf(w, "%s\n", str)
        strJson, _ := json.Marshal(questions);
        fmt.Fprintf(w, "%s\n", strJson)
    }
}

func anwser(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    fmt.Fprint(w, "Hello World")
    fmt.Fprint(w, jsontype.SPREADSHEET_KEY);
}
