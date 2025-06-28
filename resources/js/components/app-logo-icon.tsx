import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="10" width="32" height="28" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
            <path d="M24 12V36" stroke="currentColor" strokeWidth="2" />
            <path d="M10 12L24 18L38 12" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}
