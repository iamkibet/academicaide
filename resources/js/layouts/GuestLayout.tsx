import { type SharedData } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const services = [
    { name: 'Custom Essay Writing Service', href: '/services/custom-essay' },
    { name: 'Dissertation Writing', href: '/services/dissertation' },
    { name: 'Research Paper Writing', href: '/services/research-paper' },
    { name: 'Term Paper Writing', href: '/services/term-paper' },
    { name: 'Admission Essay Writing', href: '/services/admission-essay' },
    { name: 'Essay Editing', href: '/services/essay-editing' },
    { name: 'Coursework Writing', href: '/services/coursework' },
    { name: 'Physics Help', href: '/services/physics' },
    { name: 'Buy Research Paper', href: '/services/buy-research-paper' },
    { name: 'Buy Dissertation', href: '/services/buy-dissertation' },
    { name: 'View All Services', href: '/services', className: 'border-t border-gray-100 mt-2 pt-2' },
];

const offers = [
    { name: 'Buy Essay', href: '/offers/buy-essay' },
    { name: 'College Essay Writing Service', href: '/offers/college-essay' },
    { name: 'Rewrite My Essay', href: '/offers/rewrite-essay' },
    { name: 'Do My Homework', href: '/offers/homework' },
    { name: 'Do My Math Homework', href: '/offers/math-homework' },
    { name: 'Pay For Homework', href: '/offers/pay-homework' },
    { name: 'Economics Help', href: '/offers/economics' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function GuestLayout({ children }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Navigation */}
            <header
                className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-200 ${
                    isScrolled ? 'bg-white shadow-sm dark:bg-gray-800' : 'bg-transparent'
                }`}
            >
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <h1 className="text-2xl font-bold text-blue-600">AcademicAide</h1>
                            </Link>
                            <div className="hidden md:ml-10 md:flex md:space-x-8">
                                <Link
                                    href="/writers"
                                    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                                        isScrolled ? '' : ' hover:text-blue-100'
                                    }`}
                                >
                                    Writers
                                </Link>
                                <Link
                                    href="/how-to-order"
                                    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                                        isScrolled ? '' : ' hover:text-blue-100'
                                    }`}
                                >
                                    How to Order
                                </Link>
                                <Link
                                    href="/reviews"
                                    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                                        isScrolled ? '' : ' hover:text-blue-100'
                                    }`}
                                >
                                    Reviews
                                </Link>
                                <Link
                                    href="/about"
                                    className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                                        isScrolled ? '' : ' hover:text-blue-100'
                                    }`}
                                >
                                    About Us
                                </Link>

                                {/* Services Dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button
                                        className={`inline-flex items-center ${
                                            isScrolled
                                                ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                : ' hover:text-gray-600/90'
                                        }`}
                                    >
                                        Services
                                        <ChevronDownIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="ring-opacity-5 absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800">
                                            <div className="py-1">
                                                {services.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    item.className || '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Offers Dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button
                                        className={`inline-flex items-center ${
                                            isScrolled
                                                ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                : ' hover:text-gray-600/90'
                                        }`}
                                    >
                                        Offers
                                        <ChevronDownIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="ring-opacity-5 absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800">
                                            <div className="py-1">
                                                {offers.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route('login')}
                                            className={`text-sm font-medium ${
                                                isScrolled
                                                    ? 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                    : ' '
                                            }`}
                                        >
                                            Log in
                                        </Link>
                                        <span className={`text-sm ${isScrolled ? 'text-gray-700' : ''}`}>/</span>
                                        <Link
                                            href={route('register')}
                                            className={`text-sm font-medium ${
                                                isScrolled
                                                    ? 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                                    : ' '
                                            }`}
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                                    >
                                        Order Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-2">{children}</main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/writers"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Our Writers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Services</h3>
                            <ul className="mt-4 space-y-4">
                                {services.slice(0, 5).map((service) => (
                                    <li key={service.name}>
                                        <Link
                                            href={service.href}
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            {service.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link
                                        href="/how-to-order"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        How to Order
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Connect</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link
                                        href="/reviews"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Reviews
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/newsletter"
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Newsletter
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} AcademicAide. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
