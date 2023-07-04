

## Descripción

Configuración de campaña en las diferentes sucursales de un comercio.

## Instalación

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

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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
