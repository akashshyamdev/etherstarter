import React, { HTMLAttributes } from 'react';

export interface HeadingProps {
	className?: string;
	children: React.ReactNode;
	style?: HTMLAttributes<HTMLHeadingElement>['style'];
}

export default function Heading({ style, children, className }: HeadingProps) {
	return (
		<h1 style={style} className={`text-6xl mb-10 font-display ${className}`}>
			{children}
		</h1>
	);
}
