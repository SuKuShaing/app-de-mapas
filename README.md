# Proyecto de App de Mapas

Es un proyecto de prueba para ver como usar mapas en aplicaciones móviles con React Native y Expo.

## Características

- Mapa interactivo con marcadores
- Búsqueda de ubicaciones
- Navegación por coordenadas
- Soporte para iOS y Android
- Uso de Google Maps API
- Configuración de claves API para Google Maps (requerida para funcionamiento en producción)
- Manejo de permisos de ubicación
- Ejemplos de marcadores y rutas
- Ejemplos de geocodificación (conversión entre direcciones y coordenadas)
- Ejemplos de direcciones y coordenadas
- Ejemplos de búsqueda de lugares
- Ejemplos de cálculo de rutas (entre puntos)
- Ejemplos de manejo de eventos del mapa (tocar, arrastrar, etc.)

## Tecnologías

- React Native
- Expo
- Google Maps API
- TypeScript

## Requisitos

### Instalar Java 17
¿por qué el 17 y no la última versión? Por compatibilidad con las herramientas de construcción de Android, compileSdk y Gradle.

[Conversación en Perplexity que tiene más info](https://www.perplexity.ai/search/tengo-ese-error-como-lo-soluci-6mF7TUT4RkuxgK9J4Kc1yw#0)

#### Paso a paso para instalar Java 17 en Windows 11
1) Descargar la última versión de Java 17 (hasta ahora es 17.0.2) desde aquí https://jdk.java.net/archive/#fromHistory
2) Descomprimir la carpeta en C:/ o en C:/program_files/
3) copiar la ruta, por ejemplo C:\jdk-17.0.2
4) ir a inicio y buscar "Variables de entorno"
5) En la sección "Variables del sistema", haz clic en "Nuevo...".
6) En el campo "Nombre de variable" escribe: JAVA_HOME
7) En el campo "Valor de variable" pega la ruta que copiaste en el paso 3.
8) Haz clic en "Aceptar"
9) Luego, en la lista de "Variables del sistema", ubica la variable llamada "Path" y selecciona "Editar...".
10) Haz clic en "Nuevo" y escribe esta línea: %JAVA_HOME%\bin
11) Guarda todos los cambios haciendo clic en "Aceptar" en todas las ventanas.
12) Abre una consola nueva (PowerShell o cmd) y verifica con: 
```sh
echo %JAVA_HOME%
java -version
```
13) sí te responde con la versión de java, todo ha sido correctamente instalado

Seba2Seba: en un futuro probar sí las nuevas versiones de Java tienen compatibilidad con las herramientas de construcción de Android.


#### Crear el archivo debug.keystore (colocar tu ruta en tu pc)
Este archivo se necesita para obtener el hash de firma necesario para Google Maps.
```sh
keytool -genkey -v -keystore C:\Users\YourUserNameHere\.android\debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```
Este comando lo crea y lo muestra, sí no lo muestra, puedes usar el comando que está en google console en la Clave de Api y ocupar el que es para tu dispositivo.

### Obtener el hash de firma (colocar tu ruta en tu pc)
Sí ya está creado el debug.keystore, este comando solo te muestra el hash de firma, se obtiene de google console.
```sh
keytool -list -v -keystore C:\Users\YourUserNameHere\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Sí el error es que no reconoce el comando keytool, es porque no está instalado Java.


### Prebuild
Para crear una apk que corra en el emulador o en el celular, ya no está corriendo Expo, ahora es la app que creamos.
```sh
npx expo prebuild --clean
```

### Run Android
Ahora sí, con la apk creada, se puede ejecutar en el emulador o en el celular.
```sh
npx expo run:android
```