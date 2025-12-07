import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnownLocation: LatLng | null;   // última ubicación conocida
    userLocationList: LatLng[];         // lista de ubicaciones en las que ha estado el usuario
    watchSubscriptionId: LocationSubscription | null;   // el id de la suscripción de de seguimiento del usuario

    getLocation: () => Promise<LatLng>; // obtiene la ubicación actual del usuario cuando se ejecuta
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

/**
 * Store que almacena las ubicaciones
*/
export const useLocationStore = create<LocationState>()( (set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSubscriptionId: null,

    getLocation: async() => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: async () => {
        const oldSubscription = get().watchSubscriptionId;
        if(oldSubscription !== null) { //sí existe una suscripción previa la borramos
            get().clearWatchLocation();
        }

        const watchSubscription = await watchCurrentPosition( // al ejecutarse guarda la última posición conocida en lastKnownLocation y en userLocationList
            (latLng) => {
                set({
                    lastKnownLocation: latLng,
                    userLocationList: [...get().userLocationList, latLng],
                });
            }
        );

        set({watchSubscriptionId: watchSubscription}) // guarda el id de la suscripción
    },

    clearWatchLocation: () => { // limpia la suscripción sí es que existe alguna
        const subscription = get().watchSubscriptionId;

        if ( subscription !== null ) {
            subscription.remove();
        }
    },
}));