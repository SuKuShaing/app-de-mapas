import { LatLng } from "@/infrastructure/interfaces/lat-Lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
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
    const [isFollowingUser, setIsFollowingUser] = useState<Boolean>(true);
    const [showPolyline, setShowPolyline] = useState<boolean>(false);
    const {
        watchLocation,
        clearWatchLocation,
        lastKnownLocation,
        getLocation,
        userLocationList,
    } = useLocationStore();

    useEffect(() => {
        watchLocation(); // al cargar la pantalla del mapa se suscribe a watchLocation para empezar a recibir las coordenadas

        return () => {
            clearWatchLocation();
        };
    }, []);

    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);

    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: latLng,
        });
    };

    //movemos la cámara hasta la ubicación inicial o la última ubicación conocida
    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        } else {
            moveCameraToLocation(lastKnownLocation);
        }

        const location = await getLocation();
        if (!location) return;

        moveCameraToLocation(location);
        // setIsFollowingUser(true);
    };

    return (
        <View {...rest}>
            <MapView
                ref={mapRef}
                onTouchStart={() => setIsFollowingUser(false)} // cuándo el usuario toca la pantalla del mapa
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
            >
                {showPolyline && (
                    // para usar polylines solo hay que usar el componente que trae el mapa
                    <Polyline
                        coordinates={userLocationList}
                        strokeColor="red"
                        strokeWidth={2}
                    />
                )}
            </MapView>

            <FAB
                style={{
                    bottom: 140,
                    right: 20,
                }}
                // onPress={moveToCurrentLocation}
                onPress={() => setShowPolyline(!showPolyline)} // sigue o deja de seguir al usuario
                iconName={showPolyline ? "eye-outline" : "eye-off-outline"}
            />
            <FAB
                style={{
                    bottom: 80,
                    right: 20,
                }}
                // onPress={moveToCurrentLocation}
                onPress={() => setIsFollowingUser(!isFollowingUser)} // sigue o deja de seguir al usuario
                iconName={
                    isFollowingUser ? "walk-outline" : "accessibility-outline"
                }
            />
            <FAB
                style={{
                    bottom: 20,
                    right: 20,
                }}
                onPress={moveToCurrentLocation}
                // onPress={() => setIsFollowingUser(true)}
                iconName="compass-outline"
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
