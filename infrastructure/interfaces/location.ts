/**
 * Este archivo contiene una lista personalizada de los estados de los permisos de la ubicación.
 */

/**
 * Contiene los estados de los permisos de la ubicación.
 * Checking, Granted, Denied, Blocked, Limited, Unavailable, Undetermined.
 * 
 * CHECKING: Se está verificando el permiso.
 * GRANTED: El permiso ha sido concedido.
 * DENIED: El permiso ha sido denegado.
 * BLOCKED: El permiso ha sido bloqueado.
 * LIMITED: El permiso ha sido limitado.
 * UNAVAILABLE: El permiso no está disponible.
 * UNDETERMINED: El estado del permiso no ha sido determinado.
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