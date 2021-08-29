import { connect } from 'http2';
import React from 'react';

interface CardProps {
	title: string;
	subtitle: string;
	content: string;
}

export default function Card({ content, subtitle, title }: CardProps) {
	return (
		<div className='border-2 py-5 px-5'>
			<h3 className='text-3xl'>{title}</h3>
			<h6 className='text-lg text-gray-400'>{subtitle}</h6>

			<p>{content}</p>
		</div>
	);
}
