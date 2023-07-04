

## Descripción

Configuración de campaña en las diferentes sucursales de un comercio.

## Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:

- Asegúrate de tener Node.js y npm instalados en tu máquina.

- Clona el repositorio en tu entorno local o descarga el archivo ZIP.

- Abre una terminal y navega hasta el directorio del proyecto.

- Ejecuta el siguiente comando para instalar las dependencias:

```bash
$ npm install
```

## Configure la base de datos

Abre una terminal o línea de comandos y navega hasta la ubicación de tu archivo docker-compose.yml.

Ejecuta el siguiente comando para iniciar el contenedor de PostgreSQL:

```bash
docker-compose up -d
```

## Correr API

La API está configurada para ejecutarse en diferentes modos según tus necesidades. A continuación, se detallan los comandos disponibles para iniciar la API:

Modo de desarrollo:

```bash
# development
$ npm run start
```
Este comando inicia la API en modo de desarrollo. Será útil cuando estés realizando pruebas y desarrollo localmente.

Modo de observación:
```bash
# watch mode
$ npm run start:dev

```
Este comando inicia la API en modo de observación. La API se reiniciará automáticamente cada vez que detecte cambios en los archivos. Es especialmente útil durante el desarrollo activo y la depuración.

Modo de producción:
```bash
# production mode
$ npm run start:prod
```
Este comando inicia la API en modo de producción. Se recomienda utilizar este modo al implementar la API en un entorno de producción.

### Endpoints de la API

A continuación se muestran algunos ejemplos de los endpoints disponibles en la API:

Flujo de Ejecución endpoinds
- `POST-//brands`: Crear comercio o marca.
- `POST-//branches`: Crear sucursales de un comercio.
- `POST-//campaign`: Crea campaña de cualquier tipo para un comercio.
- `POST-//user`: Usuario x que realiza una compra en el comercio.
- `POST-//cashPoints`: Registrar el valor de una compra en puntos y cashback acumulado para un usuario.

Ademas existen otros para la administración de la api que pueden ser revisados en  el formato swagger ubicado en la raiz del API "http://localhost:3000/"


## Observaciones Generales

- El proyecto no esta 100% terminado y estable, por lo que pueden presentarse errores, sin embargo deberia poderse probar un flujo normal de camino feliz.
- No se completaron pruebas unitarias
- No se agrego plan de despliegue mas halla de node.

## License

Nest is [MIT licensed](LICENSE).
