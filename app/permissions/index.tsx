import { ThemedText } from "@/presentation/components/shared/Themed-text";
import ThemePressable from "@/presentation/components/shared/ThemePressable";
import { usePermissionsStore } from "@/presentation/store/usePermissions";
import { View } from "react-native";

/**
 * Esta pantalla es para solicitar los permisos de la ubicación
 * @returns Un componente View con un botón para solicitar el permiso y un texto para mostrar el estado actual del permiso
 */
const PermissionScreen = () => {

	const { locationStatus, requestLocationPermission } = usePermissionsStore();

	return (
		<View style={{ 
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		}}>
			<ThemePressable onPress={requestLocationPermission}>
				Habilitar ubicación
			</ThemePressable>
			<ThemedText>Estado actual: {locationStatus}</ThemedText>
		</View>
	);
};
// Tengo una sola oportunidad para pedir el permiso, si el usuario no lo da, queda como Denegado y por más que el
// usuario vuelva a apretar el botón, no se lanzará la ventana de solicitar el permiso 

export default PermissionScreen;
