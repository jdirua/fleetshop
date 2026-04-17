'use client';

import { useState, useEffect, useTransition } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Users, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createRole, getRoles, CreateRoleState } from '@/lib/actions/roles';

// --- Types and Constants ---
const availablePermissions = [
    { id: 'viewDashboard', label: 'View Dashboard' },
    { id: 'manageUsers', label: 'Manage Users' },
    { id: 'editSettings', label: 'Edit System Settings' },
    { id: 'vendors', label: 'Access Vendors' },
    { id: 'fuelLogs', label: 'Access Fuel Logs' },
    { id: 'maintenance', label: 'Access Maintenance' },
    { id: 'reporting', label: 'Access Reporting' },
] as const;

type PermissionId = typeof availablePermissions[number]['id'];

interface Role {
    name: string;
    permissions: Record<PermissionId, boolean>;
}

const initialState: CreateRoleState = { message: undefined, errors: {}, status: undefined };

// --- Submit Button Component ---
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={pending}>
            {pending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
            ) : (
                <><PlusCircle className="mr-2 h-4 w-4" /> Add New Role</>
            )}
        </Button>
    );
}

// --- Main Dialog Component ---
export function ManageRolesDialog({ children }: { children: React.ReactNode }) {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [, startTransition] = useTransition();
    const [state, formAction] = useActionState(createRole, initialState);

    const fetchRoles = () => {
        setIsLoading(true);
        getRoles()
            .then(fetchedRoles => setRoles(fetchedRoles as Role[]))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (!state) return;
        if (state.status === 'success') {
            toast.success(state.message);
            startTransition(() => fetchRoles()); // Refetch roles on success
        } else if (state.status === 'error' && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="glass-card-deep max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center"><Users className="mr-2" /> Manage Roles</DialogTitle>
                    <DialogDescription>Define custom roles and assign permissions.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    {/* Left side: Existing Roles List */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium text-slate-100">Existing Roles</h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin text-slate-400"/></div>
                        ) : (
                            <div className="space-y-2">
                                {roles.map((role) => (
                                    <div key={role.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-300 font-medium">{role.name}</span>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4 text-slate-400 hover:text-white" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side: Create/Edit Role Form */}
                    <div>
                        <h3 className="mb-4 text-lg font-medium text-slate-100">Create New Role</h3>
                        <form action={formAction} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="role-name">Role Name</Label>
                                <Input id="role-name" name="name" type="text" placeholder='e.g., "Auditor"' className="bg-slate-900/50 border-slate-700" required />
                                {state?.errors?.name && <p className="text-red-500 text-xs pt-1">{state.errors.name[0]}</p>}
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium text-slate-300">Permissions</h4>
                                <PermissionsProvider />
                                {state?.errors?.permissions && <p className="text-red-500 text-xs pt-1">{state.errors.permissions[0]}</p>}
                            </div>
                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// --- Permissions Provider Component ---
function PermissionsProvider() {
    const [permissions, setPermissions] = useState<Record<PermissionId, boolean>>(
        Object.fromEntries(availablePermissions.map(p => [p.id, false])) as Record<PermissionId, boolean>
    );

    const handlePermissionChange = (permissionId: PermissionId, checked: boolean) => {
        setPermissions(prev => ({ ...prev, [permissionId]: checked }));
    };

    return (
        <div className="space-y-3 p-4 rounded-lg bg-slate-900/40 border border-slate-700/50">
            <input type="hidden" name="permissions" value={JSON.stringify(permissions)} />
            {availablePermissions.map(permission => (
                <div key={permission.id} className="flex items-center justify-between">
                    <Label htmlFor={permission.id} className="text-slate-300 font-normal">{permission.label}</Label>
                    <Switch
                        id={permission.id}
                        checked={permissions[permission.id]}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                    />
                </div>
            ))}
        </div>
    );
}
