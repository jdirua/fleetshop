export type UserRole = 'admin' | 'manager' | 'mechanic' | 'readonly';

export const ROLES = {
  ADMIN: 'admin' as UserRole,
  MANAGER: 'manager' as UserRole,
  MECHANIC: 'mechanic' as UserRole,
  READONLY: 'readonly' as UserRole,
};

export const PERMISSIONS = {
  // Vehicle Permissions
  'vehicles:create': [ROLES.ADMIN, ROLES.MANAGER],
  'vehicles:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'vehicles:update': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'vehicles:delete': [ROLES.ADMIN, ROLES.MANAGER],

  // Work Order Permissions
  'work-orders:create': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'work-orders:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'work-orders:update': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'work-orders:delete': [ROLES.ADMIN, ROLES.MANAGER],

  // Inventory Permissions
  'inventory:create': [ROLES.ADMIN, ROLES.MANAGER],
  'inventory:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'inventory:update': [ROLES.ADMIN, ROLES.MANAGER],
  'inventory:delete': [ROLES.ADMIN, ROLES.MANAGER],

  // Vendor Permissions
  'vendors:create': [ROLES.ADMIN, ROLES.MANAGER],
  'vendors:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.READONLY],
  'vendors:update': [ROLES.ADMIN, ROLES.MANAGER],
  'vendors:delete': [ROLES.ADMIN, ROLES.MANAGER],
  
  // Fuel Log Permissions
  'fuel-logs:create': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'fuel-logs:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'fuel-logs:update': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'fuel-logs:delete': [ROLES.ADMIN, ROLES.MANAGER],

  // Activity Log Permissions
  'activity-log:read': [ROLES.ADMIN, ROLES.MANAGER],

  // Report Permissions
  'reports:read': [ROLES.ADMIN, ROLES.MANAGER],

  // Document Permissions
  'documents:create': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],
  'documents:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'documents:delete': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC],

  // Settings Permissions
  'settings:read': [ROLES.ADMIN],
  'settings:update': [ROLES.ADMIN],

  // User Permissions
  'users:create': [ROLES.ADMIN, ROLES.MANAGER],
  'users:read': [ROLES.ADMIN, ROLES.MANAGER, ROLES.MECHANIC, ROLES.READONLY],
  'users:update': [ROLES.ADMIN, ROLES.MANAGER],
  'users:delete': [ROLES.ADMIN, ROLES.MANAGER],
};

export type Permission = keyof typeof PERMISSIONS;

export const hasPermission = (userRole: UserRole, permission: Permission) => {
  return PERMISSIONS[permission].includes(userRole);
};
