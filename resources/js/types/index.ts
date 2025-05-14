export interface User {
    id: number;
    name: string;
    email: string;
    role: 'A' | 'U';
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
    errors: Record<string, string>;
    [key: string]: any;
}
