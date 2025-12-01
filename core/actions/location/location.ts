import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import * as Location from "expo-location";

export const getCurrentLocation = async():Promise<LatLng> => {
    try {
        const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest // Highest gasta más batería, pero es más precisa, lowest gasta menos batería, pero no es tan precisa 
        });

        return {
            latitude: coords.latitude,
            longitude: coords.longitude
        };

    } catch (error) {
        throw new Error ('No se pudo obtener la ubicación');
    }
}

export const watchCurrentPosition = (
    locationCallback: (location: LatLng) => void,
) => {
    return Location.watchPositionAsync({
        // watchPositionAsync es una suscripción y por ende hay que describirse cuando se no se ocupe
        // Esto está pidiendo la ubicación a la api del celular, envió la configuración
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 10,
    }, ({ coords }) => {
        locationCallback({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    })
}