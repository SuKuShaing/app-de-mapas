import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<MapView 
				style={styles.map}
				initialRegion={{ // Qué ciudad inicial mostrará el mapa
					latitude: -33.42,
					longitude: -70.73,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsPointsOfInterest={false} // esto es para que no se muestren los puntos de interés
				provider={PROVIDER_GOOGLE} // esto es para ios ya que android siempre usa google maps
			/>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
		// backgroundColor: "red",
	}
})

/**
 * para ver la key de google maps, se debe ir a la consola de google cloud y crear un proyecto nuevo, y luego crear una clave API
 * se debe colocar el nombre del paquete, el que se obtiene haciendo el prebuild
 * también se debe tener la huella digital del equipo.
 * para eso hay que ocupar el comando:
 * keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
 * Sí el error es que no loe encuentra, debe moverte a la carpeta de tu usuario y colocar en la ruta ".android\debug.keystore"
 * pero sí el archivo debug.keystore no existe, se debe crear con el comando:
 * keytool -genkey -v -keystore C:\Users\YourUserNameHere\.android\debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
 * Te preguntará unas cuantas cosas y después creará el archivo.
 * ahora que tienes el archivo, debes ejecutar el primer comando de la los que deje aquí para obtener la huella digital.
 * 
 * más info aquí: https://stackoverflow.com/questions/27037194/keystore-file-doesnt-exist/74223428#74223428
 */