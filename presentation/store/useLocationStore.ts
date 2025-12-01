import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnownLocation: LatLng | null; // última ubicación conocida
    userLocationList: LatLng[];
    watchSuscriptionId: LocationSubscription | null;

    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

/**
 * Store que almacena las ubicaciones
*/
export const useLocationStore = create<LocationState>()( (set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSuscriptionId: null,

    getLocation: async() => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: async () => {
        const oldSuscription = get().watchSuscriptionId;
        if(oldSuscription !== null) {
            get().clearWatchLocation();
        }
        
        const watchSusciption = await watchCurrentPosition(
            (latLng) => {
                set({
                    lastKnownLocation: latLng,
                    userLocationList: [...get().userLocationList, latLng],
                })
            }
        );

        set({watchSuscriptionId: watchSusciption})
    },

    clearWatchLocation: () => {
        const subscription = get().watchSuscriptionId;

        if ( subscription !== null ) {
            subscription.remove();
        }
    },
}));