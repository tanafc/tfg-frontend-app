# Proyecto de TFG
## Desarrollo de aplicación móvil
Aplicación móvil para la geolocalización de productos alimenticios. Hace uso de la [API REST](https://github.com/tanafc/tfg-backend) desarrollada en el proyecto.

## Ejecución
Es necesario tener instalado NodeJS, así como la herramienta de Expo CLI. Más información sobre su instalación [aquí](https://docs.expo.dev/get-started/installation/).

Para la ejecución del proyecto, se utilizan los comandos:
```
npm install
npm start
```
Esto iniciará el Metro Bundler, que nos proporcionará un código QR a escanear para la aplicación de [Expo Go](https://expo.dev/client) (Android) o la aplicación de cámara (iOS). Al escanearse, se iniciará la build correspondiente, siendo posible probar la aplicación en el propio dispositivo móvil.

> **_Nota:_**  Se debe editar la URL base del fichero de `src/api/httpClient.ts` con la dirección a la API REST en ejecución, que en un entorno local con una dirección IP privada debería ser de la forma `http://192.168.0.0:8000`.

## Autor
Tanausú - [@tanafc](https://github.com/tanafc)
