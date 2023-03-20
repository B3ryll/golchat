package main

import (
    "fmt"
    . "net/http"
    _ "strings"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    // @ debug : remove this later ...
    CheckOrigin: func(r *Request) bool {
        return true
    },
}

func main() {
    indexHandle := func (writ ResponseWriter, req *Request) {
        ServeFile(writ, req, "index.html")
    }
    HandleFunc("/", indexHandle)

    jsAppHandle := func (writ ResponseWriter, req *Request) {
        ServeFile(writ, req, "app.js")
    }
    HandleFunc("/app.js", jsAppHandle)

    chatHandle := func (writ ResponseWriter, req *Request) {
        conn, err := upgrader.Upgrade(writ, req, nil)
        if err != nil {
            fmt.Print("upgrade failed: ", err)
            return
        }
        defer conn.Close()

        for {
            mt, msg, err := conn.ReadMessage()
            if err != nil {
                fmt.Println("read failed: ", err)
                break
            }

            input   := string(msg)
            message := input + "(check)"

            output := []byte(message)

            err = conn.WriteMessage(mt, output)
            if err != nil {
                fmt.Println("write failed:", err)
                break
            }
        }
    }
    HandleFunc("/chat", chatHandle)

    fmt.Printf("running webserver on port 8080\n")
    ListenAndServe(":8080", nil)
}
