import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";
import { AppState } from "react-native";
import { usePermissionsStore } from "../store/usePermissions";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
    const { locationStatus, checkLocationPermission } = usePermissionsStore();
    const [isInitialized, setIsInitialized] = useState(false);

    /**
     * si tenemos los permisos de la ubicación, redirigimos a la pantalla de mapas.
     * si no tenemos los permisos de la ubicación, redirigimos a la pantalla de permisos.
     */ 
    useEffect(() => {
        if (!isInitialized) return;

        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace("/map");
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace("/permissions");
        }
    },[locationStatus,isInitialized])

    /**
     * verifica en cada pantalla sí tenemos los permisos de la ubicación.
     */
    useEffect(() => {
        const initialize = async () => {
            await checkLocationPermission();
            setIsInitialized(true);
        };
        initialize();
    }, []);

    /**
     * Estar pendiente cuando el estado del permiso de la ubicación cuando la aplicación cambie de estado (este estado es sí está abierta, en 2do plano o cerrada)
     */
    useEffect(() => {

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            // cuando el estado (el estado es sí está abierta, en 2do plano o cerrada) de la aplicación cambie, se ejecuta la función
            console.log('nextAppState: ', nextAppState);
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        })

        return () => {
            // cuando ya no es necesaria la suscripción, la eliminamos
            subscription.remove();
        }
    },[])


	return <>{children}</>;
};

export default PermissionsCheckerProvider;
