sequenceDiagram
    participant browser
    participant server
    browser->>server: El navegador realiza una peticion GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: El servidor recibe la peticion y responde con el HTML de la pagina
    deactivate server
    browser->>server: El navegador recibe la respuesta del servidor y realiza la peticion GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: El servidor recibe la peticion y responde el archivo main.css
    deactivate server
    browser->>server: El navegador recibe la respuesta del servidor y realiza la peticion GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: El servidor recibe la peticion y responde el archivo spa.js
    deactivate server
    browser->>server: El navegador recibe la respuesta del servidor, procesa el archivo spa.js y realiza la peticion https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: El servidor responde el archivo data.json, el script spa.js en el navegador agrega elementos al DOM que corresponden a los datos del archivo data.json
    deactivate server