package devquest

import (
    "fmt"
    "strconv"
    "net/http"
    "log"
    "encoding/json"
    "io/ioutil"
    "os"
    "appengine"
    "appengine/urlfetch"
    "appengine/datastore"
    "appengine/memcache"
)

type Resp struct {
    IdUser string `json:id`
    Pseudo string `json:pseudo`
    Network string `json:network`
    Scores int `json:score`
    Time int64 `json:time`
}

type jsonobject struct {
    SpreadsheetKey string
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

type Answer struct {
    User string
    Question string
}

type Question struct{
    Id string `json:"id"`
    Title string `json:"title"`
    RepA string `json:"repA"`
    RepB string `json:"repB"`
    RepC string `json:"repC"`
    RepD string `json:"repD"`
    Code string `json:"-"`
    Resp string `json:"-"`
}

type Questions struct{
    Questions []Question `json:"questions"`
}



func init() {
    http.HandleFunc("/api/v1/questions", questions)
    http.HandleFunc("/api/v1/answer", answer)
    http.HandleFunc("/api/v1/scores", scores)

    if v := os.Getenv("SPREADSHEET_VAR"); v != "" {
      //...
        log.Print(v)
    }


}

func marshalQuestions(data SpreadSheet) Questions{
    questions := Questions{}
    questions.Questions = make([]Question,(len(data.Feed.Entry)/6));    
    indexQuestion :=0
    indexRow := 1;
    for _,element := range data.Feed.Entry{
        keyId := "A"+strconv.Itoa(indexRow)
        if element.Title.T == keyId{
            idTmp := element.Content.T
            question := Question{
                Id: idTmp,
            }
            questions.Questions[indexQuestion] = question
        }else{
            question := &questions.Questions[indexQuestion]                 

            keyQuestionTitle := "B"+strconv.Itoa(indexRow)
            keyRepA := "C"+strconv.Itoa(indexRow)
            keyRepB := "D"+strconv.Itoa(indexRow)
            keyRepC := "E"+strconv.Itoa(indexRow)
            keyRepD := "F"+strconv.Itoa(indexRow)
            keyCode := "G"+strconv.Itoa(indexRow)
            keyResp := "H"+strconv.Itoa(indexRow)
            if element.Title.T == keyQuestionTitle{
                question.Title = element.Content.T;
            }else if element.Title.T == keyRepA{
                question.RepA = element.Content.T;
            }else if element.Title.T == keyRepB{
                question.RepB = element.Content.T;
            }else if element.Title.T == keyRepC{
                question.RepC = element.Content.T;
            }else if element.Title.T == keyRepD{
                question.RepD = element.Content.T;
            }else if element.Title.T == keyCode{
                question.Code = element.Content.T;
            }else if element.Title.T == keyResp{
                question.Resp = element.Content.T;
                indexRow++
                indexQuestion++
            }
        }
    }
    return questions
}

func questions(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound) 
    c := appengine.NewContext(r)
    client := urlfetch.Client(c)
    spreadsheetKey := os.Getenv("SPREADSHEET_VAR");

    // Mise en cache direct du spreadsheet
    keyMemCache := "questions"+spreadsheetKey;
    item, err := memcache.Get(c, keyMemCache);       
    var strJson []byte 
    log.Print("questions")
    log.Print(keyMemCache)
    if  err == memcache.ErrCacheMiss || err != nil{
        log.Print("No Cache")
        // Si c'est pas en cache, on regarde si c'est en base
        var questions Questions
        keyQuestions := datastore.NewKey(c, "Questions", keyMemCache, 0, nil)
        if err := datastore.Get(c, keyQuestions, &questions); err != nil{
            log.Print("No Datastore")
            // Si c'est pas présent en base, alors on récupère depuis le webservice
            // No Cache info
            url := "https://spreadsheets.google.com/feeds/cells/"+spreadsheetKey+"/od6/public/basic?alt=json";
            log.Print(url)
            resp, err := client.Get(url)

            if err != nil {
                // En cas d'erreur on quitte le prog
                fmt.Fprintf(w, "%s\n", err)
                os.Exit(1)
            } else {
                // Sinon on transforme les données pour les sauvegardées
                body, err := ioutil.ReadAll(resp.Body)
                if err != nil {
                    fmt.Fprintf(w, "%s\n", err)
                    os.Exit(1)
                }
                data := SpreadSheet{}
                json.Unmarshal([]byte(string(body)), &data)
            
                questions = marshalQuestions(data)
               
                // On ajoute dans le datastore
                _, errDataStore := datastore.Put(c, keyQuestions, &questions)
                if  errDataStore != nil{
                    // Print error 
                    fmt.Fprintf(w, "%s\n", errDataStore)
                    // TODO jeter une erreur
                    return
                }

                // On ajout au datastore les questions pour plus de facilité d'intérogation
                for _,question := range questions.Questions{
                    keyQuestion := datastore.NewKey(c,"Question", question.Id, 0, nil)
                    _, errDataStore := datastore.Put(c, keyQuestion, &question)
                    if  errDataStore != nil{
                        // Print error
                        fmt.Fprintf(w, "%s\n", errDataStore)
                        // TODO jeter une erreur
                        return
                    }
                }
            }
        }

        tmpStrJson, _ := json.Marshal(questions);
        strJson = tmpStrJson
        itemValue := &memcache.Item{
            Key: keyMemCache, 
            Value: strJson,
        }
        // On ajoute dans le memcache
        if err := memcache.Add(c, itemValue); err == memcache.ErrNotStored {
            c.Infof("itemValue with key %q already exists", itemValue.Key)
        } else if err != nil {
            c.Errorf("error adding itemValue: %v", err)
        }
       
    } else{
        strJson = item.Value
    }   
    fmt.Fprintf(w, "%s\n", strJson)
    
}


func answer(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound)
    //fmt.Fprint(w, "Hello World\n")
    //fmt.Fprint(w, jsontype.SPREADSHEET_KEY);
    //fmt.Fprint(w, "\n")
    id := r.FormValue("id")
    pseudo := r.FormValue("pseudo")
    network := r.FormValue("network")
    indexQuestion := r.FormValue("indexQuestion")
    resp := r.FormValue("resp")
    code := r.FormValue("code")
    time := r.FormValue("time")
    if len(id) == 0 || len(indexQuestion) == 0 || len(resp) == 0 || len(code) == 0 || len(time) == 0 || len(pseudo) == 0 || len(network) == 0{
        fmt.Fprint(w, "Parametre manquant\n")    
        // TODO jetter une erreur
        return
    }
    fmt.Fprint(w, id+"\n")
    fmt.Fprint(w, pseudo+"\n")
    fmt.Fprint(w, network+"\n")
    fmt.Fprint(w, time+"\n")
    fmt.Fprint(w, code+"\n")
    fmt.Fprint(w, resp+"\n")
    fmt.Fprint(w, indexQuestion+"\n")


    c := appengine.NewContext(r)    
    var scoreQuestion int
    scoreQuestion = 0
    // On va vérifier qu'on a pas déjà répondu à la question
    keyAnswer := datastore.NewIncompleteKey(c, "Answer", nil)
    queryAnswer := datastore.NewQuery("Answer").Filter("Question = ", indexQuestion)
    answerResults := queryAnswer.Run(c)
    var answer Answer
    _, errAnswers := answerResults.Next(&answer)
    
    answerData := Answer{
        User: id,
        Question: indexQuestion,
    }
     _, errPutData := datastore.Put(c, keyAnswer, &answerData)
    if errPutData != nil {
        http.Error(w, errPutData.Error(), http.StatusInternalServerError)
        return
    }
    
    // Vérification du code de réponse
    // Get the item from the memcache
    var question Question
    keyQuestion := datastore.NewKey(c, "Question", indexQuestion, 0, nil)
    if err := datastore.Get(c, keyQuestion, &question); err != nil{
        fmt.Fprintf(w, "%s\n", err)
        // TODO jeter une erreur
        return
    }
    fmt.Fprint(w, question.Resp+"\n")
    fmt.Fprint(w, question.Code+"\n")
    if resp == question.Resp && errAnswers == datastore.Done{
        scoreQuestion += 10
    } 
    if code == question.Code && errAnswers == datastore.Done{
        scoreQuestion += 5
    }

    // Préparation du Data Store
    key := datastore.NewKey(c,"Score", id, 0, nil)



    var respDataStore Resp
    if err := datastore.Get(c, key, &respDataStore); err != nil{
        // Data pas déjà présente => on la créé
        respDataStore = Resp{
            IdUser: id,
            Pseudo : pseudo,
            Network : network,
            Time: 0,
            Scores: 0,
        }
    }
    timeTmp, _ :=strconv.ParseInt(time, 10, 64)
    respDataStore.Time += timeTmp
    respDataStore.Scores +=scoreQuestion
    _, err := datastore.Put(c, key, &respDataStore)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
}


func scores(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("SUPER-HACK", "@GDGNANTES")
    //w.WriteHeader(http.StatusFound) 
    c := appengine.NewContext(r)

    // Mise en cache direct du spreadsheet
    var strJson []byte 
    log.Print("scores")
    query := datastore.NewQuery("Score").
        Order("Score")
    var scores []Resp
    _, err := query.GetAll(c, &scores)
     if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    tmpStrJson, _ := json.Marshal(scores);
    strJson = tmpStrJson        
       
    fmt.Fprintf(w, "%s\n", strJson)
    
}