import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect, useRef } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends ViewProps {
    showUserLocation?: boolean;
    initialLocation: LatLng;
}

const CustomMap = ({
    initialLocation,
    showUserLocation = true,
    ...rest
}: Props) => {
    const mapRef = useRef<MapView>(null);
    const { watchLocation, clearWatchLocation, lastKnownLocation } =
        useLocationStore();

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        };
    }, []);

    useEffect(() => {
        if (lastKnownLocation) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation]);

    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: latLng,
        });
    };

    return (
        <View {...rest}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE} // esto es para ios y android usen google maps, para android es obligatorio, para ios es opcional (si no está, ocupa apple maps)
                initialRegion={{
                    // Qué ciudad inicial mostrará el mapa
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsPointsOfInterest={false} // esto es para que no se muestren los puntos de interés
                showsUserLocation={showUserLocation}
            />

            <FAB
                style={{
                    bottom: 20,
                    right: 20,
                }}
                onPress={() => {}}
                iconName="airplane-outline"
            />
        </View>
    );
};

export default CustomMap;

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
    },
});
