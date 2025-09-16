import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";
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

    // To Do: Estar pendiente cuando el estado de la aplicación cambie

	return <>{children}</>;
};

export default PermissionsCheckerProvider;
