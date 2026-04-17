export const ROLES = ['admin', 'manager', 'viewer', 'mechanic'] as const;
export type UserRole = typeof ROLES[number];

export const PERMISSIONS = {
  admin: ['*'],
  manager: ['create', 'read', 'update'],
  viewer: ['read'],
  mechanic: ['read', 'update'],
};

export function hasPermission(userRole: UserRole, requiredPermission: string): boolean {
  const userPermissions = PERMISSIONS[userRole];
  if (!userPermissions) {
    return false;
  }

  if (userPermissions.includes('*')) {
    return true;
  }

  return userPermissions.includes(requiredPermission);
}
