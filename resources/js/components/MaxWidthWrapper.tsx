import { ReactNode } from 'react';

interface MaxWidthWrapperProps {
    children: ReactNode;
    className?: string;
}

const MaxWidthWrapper = ({ children, className = '' }: MaxWidthWrapperProps) => {
    return <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>;
};

export default MaxWidthWrapper;
