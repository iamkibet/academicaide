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
    icon?: LucideIcon | string | null;
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
    title: string;
    description?: string;
    status: 'draft' | 'active' | 'completed' | 'pending' | 'pending_payment' | 'writer_pending' | 'in_progress' | 'review' | 'cancelled';
    payment_status?: string;
    assignment_type?: string;
    service_type?: string;
    academic_level?: string;
    subject?: string;
    language?: string;
    pages?: number;
    words?: number;
    size_unit?: string;
    line_spacing?: string;
    citation_style?: string;
    source_count?: string;
    price_per_page?: number;
    total_price?: number;
    is_urgent?: boolean;
    deadline?: string;
    instructions?: string;
    client_notes?: string;
    created_at?: string;
    updated_at?: string;
    client?: User;
    files?: any[];
    messages?: any[];
    can_be_edited?: boolean;
    is_overdue?: boolean;
    needs_attention?: boolean;
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
