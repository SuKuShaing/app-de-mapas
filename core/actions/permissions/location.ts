import { PermissionStatus } from "@/infrastructure/interfaces/location";
import * as Location from "expo-location";

/*
Este archivo se encarga de la gestión de permisos de la ubicación.
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
        // To Do: llamar a manualPermissionRequest();
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
    const { status } = await Location.getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
};

export const manualPermissionRequest = async () => {
    // To Do: lanzar los ajustes de la app para que el usuario pueda dar permisos

}