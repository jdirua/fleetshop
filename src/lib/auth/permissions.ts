import { getRoles } from '@/lib/actions/roles';

// Function to dynamically build permissions
export const getPermissions = async () => {
  const roles = await getRoles();
  const permissions: { [key: string]: string[] } = {};

  roles.forEach(role => {
    if (role.name && role.permissions) {
      const permissionKeys = (Object.keys(role.permissions) as Array<keyof typeof role.permissions>).filter(
        k => role.permissions[k]
      );
      permissions[role.name.toLowerCase()] = permissionKeys.length > 0 ? permissionKeys.map(p => p.toString()) : ['read'];
    }
  });

  // Add a default admin role with all permissions if it doesn't exist
  if (!permissions['admin']) {
    permissions['admin'] = ['*'];
  }

  return permissions;
};

// Example of how to use it, actual implementation will vary
export const PERMISSIONS = await getPermissions();
