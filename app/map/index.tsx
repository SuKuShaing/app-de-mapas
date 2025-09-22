import React from "react";
import { StyleSheet, View } from "react-native";

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.map} />
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