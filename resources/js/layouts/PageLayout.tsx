import { Head } from '@inertiajs/react';
import GuestLayout from './GuestLayout';

interface Props {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export default function PageLayout({ children, title, description }: Props) {
    return (
        <GuestLayout>
            <Head>
                <title>{title} - AcademicAide</title>
                {description && <meta name="description" content={description} />}
            </Head>

            <div className="bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{title}</h1>
                        {description && <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{description}</p>}
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">{children}</div>
                </div>
            </div>
        </GuestLayout>
    );
}
