# UserDebts App - Rest Project + TypeScript.

## Instrucciones de despliegue local
⚠️ Requiere Node v+18, Docker Desktop, Postman y opcional (TablePlus o DBeaber)

1. Clonar el `.env.template` y crear el `.env`
2. Ejecutar ```npm install``` para instalar las dependencias
3. Ejecutar el comando ```docker compose up -d```
4. Reconstruir el prisma client ```npm run prisma:migrate:prod```
5. Ejecutar la aplicación en dev ```npm run dev```
6. Abrir postman y probar a partir de la url base: ```http://localhost:3000/api/```
7. (Opcional): Acceder a la base de datos con la data que se encuentra en el archivo .env
8. Abrir el frontend: ```http://localhost:3000``` o clonar, configurar y correr el repostitorio del frontend ```https://github.com/oscarrodriguezbu/debt-management-frontend```

## Contexto del reto:

Imagina que estás construyendo una aplicación para gestionar deudas entre amigos. Cada usuario puede registrar deudas, pagarlas y consultar el estado. El reto consiste en construir un MVP funcional con las siguientes condiciones:

### Backend Node.js:

Crear una API REST (o GraphQL si prefieren) que permita:

● Registrar usuarios (con email y password encriptado). ✅

● Crear, consultar, editar y eliminar deudas. ✅

● Marcar una deuda como pagada. ✅

● Listar las deudas de un usuario (pendientes y pagadas). ✅

### Persistencia:

● Debes usar PostgreSQL para almacenar usuarios y deudas. ✅

● Adicionalmente, implementar una capa de caché usando DynamoDB (AWS) o Redis (simulado si no tienes AWS). ℹ️

### Validaciones obligatorias:

● No se pueden registrar deudas con valores negativos. ✅

● Una deuda pagada no puede ser modificada. ✅

### Extra (para puntos extra):

● Endpoint para exportar deudas en JSON o CSV. ℹ️

● Endpoint con agregaciones (ej: “total de deudas pagadas” o “saldo pendiente”). ✅

● Test Unitarios ℹ️


## 📌 Decisiones Técnicas

### Stack Tecnológico

● Node.js + Express: escogido por su rapidez para construir APIs REST y facilidad de integración con Prisma.

● Prisma ORM: facilita el acceso a la base de datos PostgreSQL, con tipado fuerte y migraciones automáticas.

● PostgreSQL: base de datos relacional robusta y ampliamente usada en producción.

### Modelo de Datos

● Se definieron dos entidades principales:

- User: representa a los usuarios del sistema (con id, name, email, password).

- Debt: representa las deudas, con referencias a dos usuarios: el deudor (debtorId) y el acreedor (creditorId).

● Decisión: no se usaron tablas intermedias, ya que una deuda siempre tiene exactamente un deudor y un acreedor. Se resolvió con dos relaciones hacia User.

### Manejo de Seguridad

● El campo password se guarda en la base de datos encriptado con bcrypt.

● Al devolver usuarios en las respuestas (debtor, creditor), se excluye el campo password para no exponer información sensible. Esto se resolvió mediante:

- select en Prisma

- uso de UserEntity en la capa de dominio para mapear solo id (con JWT), name y email.

### Validaciones

● DTOs (Data Transfer Objects) se usan para validar datos de entrada:

- CreateDebtDto asegura que el monto sea numérico y mayor a cero, que deudor y acreedor existan, y que no sean la misma persona.

- UpdateDebtDto restringe qué campos se pueden modificar.

● Se añadió la regla de negocio: una deuda marcada como pagada (isPaid = true) no puede volver a modificarse.

### Flujo de Deudas

● Crear deuda → por defecto isPaid = false.

● Actualizar deuda → permitido solo si no está pagada.

● Marcar deuda como pagada → se actualiza únicamente el campo isPaid a true, manteniendo el amount original para conservar el historial.

● Se evita modificar el monto a 0 al pagar, ya que el objetivo es mantener un registro fiel de la deuda original.

### Resumen de Deudas (Agregaciones)

● Se implementó un endpoint /debts/:userId/summary que devuelve:

- owed → deudas donde el usuario es deudor.

- receivable → deudas donde el usuario es acreedor.

● Cada bloque muestra los totales en estado pagado y pendiente, permitiendo visualizar el balance global del usuario.

### Arquitectura del Código

● Separación en capas:

- Routes → definen los endpoints y delegan la lógica.

- Controller → recibe la petición, valida con DTOs y responde.

- Service → contiene la lógica de negocio y el acceso a Prisma.

- Domain (Entities/DTOs) → abstraen los datos y definen contratos claros.

● Esta separación mejora la escalabilidad y hace más sencillo el testing.

✅ Con estas decisiones se logra un MVP funcional y mantenible, que cumple los requisitos del enunciado y deja la base lista para agregar mejoras futuras (como capa de caché con Redis/DynamoDB o GraphQL).

### Información acerca de los items que faltaron del reto: 

ℹ️ Implementar una capa de caché usando DynamoDB (AWS) o Redis (simulado si no tienes AWS):

No he trabajdo con esas herramientas y preferí enfocarme en lo que sé hacer muy bien. Además se maneja el caché desde el frontend con TanStack Query

ℹ️ Endpoint para exportar deudas en JSON o CSV:

Me faltó más tiempo, pero me enfoqué en las cosas mas importantes del reto.

ℹ️ Test Unitarios:

Me faltó más tiempo, pero me enfoqué en las cosas mas importantes del reto.


