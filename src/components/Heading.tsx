import React from 'react';

export interface HeadingProps {
	children: React.ReactNode;
	className?: string;
}

export default function Heading({ children, className }: HeadingProps) {
	return <h1 className={`text-6xl mb-10 font-display ${className}`}>{children}</h1>;
}
