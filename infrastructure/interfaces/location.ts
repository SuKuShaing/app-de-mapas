/**
 * Este archivo contiene una lista personalizada de los estados de los permisos de la ubicación.
 */

export enum PermissionStatus {
    CHECKING = "checking",
    GRANTED = "GRANTED",
    DENIED = "DENIED",
    BLOCKED = "BLOCKED",
    LIMITED = "LIMITED",
    UNAVAILABLE = "UNAVAILABLE",
    UNDETERMINED = "UNDETERMINED",
}