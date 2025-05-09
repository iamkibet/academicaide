import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'client';
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    client_id: number;
    admin_id: number | null;
    title: string;
    subject: string;
    academic_level: string;
    citation_style: string | null;
    pages: number;
    word_count: number | null;
    price_per_page: number | null;
    discount: number | null;
    total_price: number | null;
    status: 'draft' | 'active' | 'completed';
    payment_status: 'pending' | 'paid';
    payment_method: string | null;
    deadline: string;
    instructions: string;
    admin_notes: string | null;
    client_notes: string | null;
    is_urgent: boolean;
    revision_count: number;
    created_at: string;
    updated_at: string;
    paid_at: string | null;
    assigned_at: string | null;
    completed_at: string | null;
    last_revision_at: string | null;
    client: User;
    admin: User | null;
}

export interface Message {
    id: number;
    order_id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
    sender: User;
    receiver: User;
}

export interface NotificationSetting {
    id: number;
    user_id: number;
    email_notifications: boolean;
    in_app_notifications: boolean;
    notification_types: {
        new_order: boolean;
        order_update: boolean;
        new_message: boolean;
    };
    created_at: string;
    updated_at: string;
}
