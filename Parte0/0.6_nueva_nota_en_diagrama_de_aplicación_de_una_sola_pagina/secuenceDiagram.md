sequenceDiagram
    participant browser
    participant server
    browser->>server: El navegador realiza una peticion POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa enviando en al payload {content: "Prueba", date: "2025-01-01T21:34:50.338Z"}
    activate server
    server-->>browser: El servidor recibe la peticion y responde informacion con formato JSON {message: "note created"}
    deactivate server