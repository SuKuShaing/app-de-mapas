import {
	checkLocationPermission,
	requestLocationPermission,
} from "@/core/actions/permissions/location";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { create } from "zustand";

interface PermissionsState {
	locationStatus: PermissionStatus;
	requestLocationPermission: () => Promise<PermissionStatus>;
	checkLocationPermission: () => Promise<PermissionStatus>;
}

/**
 * Este archivo es el store (gestor de estado) de los permisos de la ubicación
 * @returns Un store con el estado de los permisos de la ubicación y las funciones para solicitar y verificar el permiso
 */
export const usePermissionsStore = create<PermissionsState>()((set) => ({
	locationStatus: PermissionStatus.CHECKING,

	requestLocationPermission: async () => {
		const status = await requestLocationPermission();

		set({ locationStatus: status }); // Actualiza el locationStatus con el set

		return status;
	},

	checkLocationPermission: async () => {
		const status = await checkLocationPermission();

		set({ locationStatus: status }); // actualiza locationStatus cambiando de PermissionStatus.CHECKING a PermissionStatus.GRANTED o PermissionStatus.DENIED

		return status;
	},
}));
