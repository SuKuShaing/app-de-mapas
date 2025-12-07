import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import * as Location from "expo-location";

/**
 * Con esta función obtenemos la ubicación del usuario
 * @returns { latitude y longitude }
 */
export const getCurrentLocation = async():Promise<LatLng> => {
    try {
        const { coords } = await Location.getCurrentPositionAsync({ //Location es la librería que se comunica con las APIs del celular ya sea Android o Ios
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

/**
 * Ejecuta una suscripción, cada vez que cambie la posición del usuario estará retornando la ubicación del usuario
 * @param locationCallback 
 * @returns 
 */
export const watchCurrentPosition = (
    locationCallback: (location: LatLng) => void,
) => {
    // watchPositionAsync recibe dos cosas:
    // 1er parámetro: configuración (precisión, intervalo de tiempo, etc.).
    // 2do parámetro: otra función callback que Expo va a llamar cada vez que llegue una nueva ubicación.
    // watchPositionAsync es una suscripción a la api del celular y por ende hay que describirse cuando se no se ocupe
    // retorna la ubicación del usuario cada vez que cambie, y para eso le envió la configuración
    // cada vez que cambia la ubicación ejecuta el callback que es la función que le pasamos para que ejecutara
    return Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        // distanceInterval: 10,
    }, ({ coords }) => {
        locationCallback({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    });
};