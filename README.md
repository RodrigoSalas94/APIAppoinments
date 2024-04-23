Api de appointment
Este proyecto consiste en una API para gestionar citas médicas. Está desarrollado mayormente en Typescript pero tiene un microservicio realizado en C#

Tecnologías Utilizadas
Node.js (TypeScript)
.NET (C#)
PostgreSQL
MONGODB
Swagger (documentación de la API)

Instrucciones para Ejecutar el Servidor

Modo DEV
Para ejecutar el servidor en modo de desarrollo, sigue estos pasos:

1) Instala las dependencias con npm install.Ejecuta el servidor con npm run start.(Typescript)
2) Instala las dependencias con dotnet add package. Ejecuta el servidor con dotnet run. (C#)

Ejecutar en Docker
Recordar tener Docker instalado previamente:
1) start:docker

Documentación de los Endpoints
Una vez que el servidor esté en ejecución, puedes acceder a la documentación de los endpoints de cada microservicio en la siguientes URL: 
1) AuthServices: http://localhost:1234/docs/
2) PatientServices: http://localhost:3000/docs/
3) SpecialistServices: http://localhost:3500/swagger/index.html
4) AppoinmentServices: http://localhost:7350/docs/


```mermaid
graph LR;
    subgraph Microservicios
    AuthServices -->|API| PatientServices;
    PatientServices -->|API| SpecialistServices;
    SpecialistServices -->|API| AppointmentServices;
    end

    Gateway --> Microservicios;
    Frontend --> Gateway;
    Cliente --> Frontend;





