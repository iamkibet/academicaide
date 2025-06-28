import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'client';
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    user: User | null;
    check: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface PageProps {
    auth: Auth;
    errors: Record<string, string>;
    [key: string]: any;
}
