import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

interface AlertProps {
	children: string | string[];
	className?: string;
}

export default function Alert({ children, className }: AlertProps) {
	return (
		<div className={`text-red-600 bg-red-100 py-7 px-5 ${className}`}>
			<h6 className='flex flex-row items-center'>
				<XCircleIcon className='w-5 h-5 mr-2' /> There was a problem
			</h6>

			<ul>{typeof children === 'string' ? <p>{children}</p> : children.map((child) => <li>{child}</li>)}</ul>
		</div>
	);
}
