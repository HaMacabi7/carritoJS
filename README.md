Plataforma de Evaluaciones Online (Microservicios) | Repositorio: AppFinal Tecnologías: Java 17, Spring Boot, Spring Cloud, MongoDB, PostgreSQL, MySQL, Docker, Angular.

Diseñé una arquitectura distribuida robusta para la gestión de exámenes académicos, enfocada en la escalabilidad y el desacoplamiento de datos:

Arquitectura y Patrones: Implementé el patrón Database per Service, aislando la lógica y los datos de cada dominio para evitar cuellos de botella y asegurar la independencia de servicios.

Persistencia Políglota (SQL + NoSQL): Integré múltiples motores de base de datos según la naturaleza del dato:

PostgreSQL para la gestión robusta de identidades en el Microservicio de Usuarios.

MySQL para la estructura relacional de los Microservicios de Cursos y Exámenes.

MongoDB para el almacenamiento de alto volumen y estructura flexible en el Microservicio de Respuestas.

Comunicación de Servicios: Orquesté la comunicación síncrona entre los dominios de Alumnos y Cursos para validar inscripciones y asignaciones en tiempo real.

Frontend: Interfaz de usuario unificada en el repositorio (Monorepo) desarrollada en Angular para el consumo de las APIs.
