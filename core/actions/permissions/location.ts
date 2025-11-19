import { PermissionStatus } from "@/infrastructure/interfaces/location";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

/*
Este archivo se encarga de la gestión de permisos de ubicación que tiene la app.
Tiene tres funciones:
1. requestLocationPermission: solicita los permisos de la ubicación al usuario.
2. checkLocationPermission: verifica si el usuario ha dado permisos de la ubicación.
3. manualPermissionRequest: lanza los ajustes de la app para que el usuario pueda dar permisos.
*/

/**
 * Solicita los permisos de la ubicación al usuario. Lanza la ventana de permisos.
 * @returns Promise<Location.PermissionStatus>
 */
export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync(); 

    if (status !== 'granted') {
        if (status === 'denied') {
            manualPermissionRequest();
        }
        // puesto que sí el usuario nego los permisos, no se puede volver a pedir mediante requestForegroundPermissionsAsync();, solo se puede hacer manual
        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
};

/**
 * Verifica si el usuario ha dado permisos de la ubicación. y se verifica en cada ocasión que se visita la app.
 * Si no ha dado permisos, ejecuta requestLocationPermission.
 * @returns Promise<Location.PermissionStatus>
 */
export const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync(); // preguntamos al celular y retorna el estado del permiso de la ubicación

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
};

/**
 * Lanza los ajustes de la app para que el usuario pueda dar permisos manualmente.
 */
export const manualPermissionRequest = async () => {
    Alert.alert(
        'Permisos de la ubicación necesario',
        'Para continuar debe habilitar el permiso de ubicación en los ajustes de la app',
        [
            {
                text: 'Abrir ajustes',
                onPress: () => {
                    Linking.openSettings();
                }
            },
            {
                text: 'Cancelar',
                style: 'destructive',
            }
        ]

    )
}