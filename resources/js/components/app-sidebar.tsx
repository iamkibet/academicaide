import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Folder, LayoutGrid, LogOut, User as UserIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Orders',
        href: '/admin/orders',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
        title: 'Pricing',
        href: '/admin/pricing',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },

    {
        title: 'Assignment Types',
        href: '/admin/assignment-types',
        icon: 'M9 17v-6h13v6M9 5v6h13V5M5 17h.01M5 11h.01M5 5h.01',
    },
    {
        title: 'Service Types',
        href: '/admin/service-types',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
    },
    {
        title: 'Languages',
        href: '/admin/languages',
        icon: 'M12 4v16m8-8H4',
    },
    {
        title: 'Line Spacing',
        href: '/admin/line-spacings',
        icon: 'M4 6h16M4 12h16M4 18h16',
    },
    {
        title: 'Pricing Config',
        href: '/admin/pricing-config',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        title: 'Academic Levels',
        href: '/admin/levels',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    { title: 'Deadlines', href: '/admin/deadlines', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Add-ons', href: '/admin/addons', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { title: 'Pages', href: '/admin/pages', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    {
        title: 'Notifications',
        href: '/admin/notifications',
        icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
];

export function AppSidebar() {
    const { props } = usePage<{ auth?: { user?: User } }>();
    const user = props.auth?.user;

    if (!user) {
        console.warn('No user found in page props. NavUser will not be rendered.');
    }
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="hover:bg-muted/50 flex items-center gap-2 rounded p-2 transition-colors">
                            <UserIcon className="size-4" />
                            <span>Account</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 text-red-600">
                                <LogOut className="size-4" />
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
