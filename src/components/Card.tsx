import React from 'react';

interface CardProps {
	title: string | number;
	subtitle: string;
	content: string;
}

export default function Card({ content, subtitle, title }: CardProps) {
	return (
		<div className='border-2 py-5 px-5 rounded w-full'>
			<h3 className='text-3xl truncate'>{title}</h3>
			<h6 className='text-lg text-gray-400'>{subtitle}</h6>

			<p className='mt-5'>{content}</p>
		</div>
	);
}
