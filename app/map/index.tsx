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