# Seed Resource Api Node.js

![Continuous Integration Workflow](https://github.com/devnido/seed-resource-api-nodejs/workflows/Continuous%20Integration%20Workflow/badge.svg)

## Este proyecto fue creado para utilizar como base en futuros desarrollos que utilicen caracteristicas similares.

Proyecto base que forma parte de otros 2 adicionales para crear un sistema en conjunto. El código del repositorio actual es el back-end que sirve para levantar un servidor de recursos el cual tiene como función principal proporcionar el acceso y almacenamiento de datos a cualquier cliente que esté previamente autorizado. Para acceder a este servidor el cliente primero debe solicitar acceso al [servidor de autenticación](https://github.com/devnido/seed-auth-api-nodejs) el cual proporcionará un token de acceso con un tiempo de vida util. Adicionalmente se puede integrar con este [panel de administración](https://github.com/devnido/seed-admin-panel-angular)

## Descripción

Está desarrollado en [Node.js](https://nodejs.org/es/) versión v12.13.0 y [mongoDB](https://www.mongodb.com/es) versión v4.2.1

## Uso 

1. Para ejecutar este código es necesario ejecutar previamente el [servidor de autenticación](https://github.com/devnido/seed-auth-api-nodejs)  ya que sin el token de acceso proporcionado por el es imposible acceder a los datos del servidor actual. Opcionalmente se puede integrar con el front-end  [panel de administración](https://github.com/devnido/seed-admin-panel-angular) lo cual se recomienda para poder entender mejor el sistema.

2. Descarga el código en tu computador.

3. Una vez descargado navega hasta la carpeta del proyecto  y luego instala las dependencias `npm install`.

4. Antes de ejecutar el código crea una copia del archivo **.env.example** ubicado en la carpeta raíz del proyecto y renombralo así **.env** para despues abrirlo y modificar los parametros según la configuración de tu entorno de desarrollo.

5. Debes tener el servicio de mongoDB corriendo en tu entorno `mongod`.

6. Para ejecutar el código puedes usar `npm run dev` para que se ejecute con nodemon

## Tests

El directiorio **/test** contiene integration tests y unit tests cada uno en su respectiva carpeta.

Para ejecutar integration test es necesario tener el servicio de mongodb funcionando `mongod`

Las variables para el entorno de testing estan definidas en el archivo **.env.testing** el cual es necesario para los test de integración

Para ejecutar todos los tests `npm test`

## Funcionalidades implementadas 

1. Validación de tokens de usuarios.
2. Agregar tareas.
3. Listar tareas de forma paginada.
4. Buscar tareas por nombre y estado.
5. Modificar el estado de la tarea en el listado.
6. Modificar el estado y el nombre de la tarea en página detalle.
7. Eliminar una tarea.
8. Modificar nombre y contraseña en el perfil de usuario.

## Documentación de la API 

#### Proximamente...