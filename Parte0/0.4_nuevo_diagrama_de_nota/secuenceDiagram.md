sequenceDiagram
    participant browser
    participant server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note {note: Prueba}
    activate server
    server-->>browser: El servidor recibe la peticion, crea una nueva nota en la base de datos y responde con un código HTTP 301
    deactivate server
    browser->>server: El navegador realiza una peticion GET a la URL de las notas https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: El servidor recibe la peticion y responde con el HTML de la pagina de las notas
    deactivate server
    browser->>server: El navegador recibe la respuesta del servidor y realiza la peticion GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: El servidor recibe la peticion y responde el archivo main.css
    deactivate server
    browser->>server: El navegador recibe la respuesta del servidor y realiza la peticion GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: El servidor recibe la peticion y responde el archivo main.js
    deactivate server
    browser->>server: El navegador realiza una peticion GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: El navegador recibe la respuesta del servidor y se muestra la información de las notas dentro del div con id notes
    deactivate server