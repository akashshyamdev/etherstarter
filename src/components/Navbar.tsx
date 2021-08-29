import Link from 'next/link';
import React from 'react';
import { PlusIcon } from '@heroicons/react/solid';

export default function Navbar() {
	return (
		<header className='flex flex-row justify-between items-center h-20 pl-20 border-b-2'>
			<Link href='/'>
				<a className='text-xl font-display'>EtherStarter</a>
			</Link>

			<div className='h-20 flex flex-row items-center'>
				<Link href='/'>
					<a className='text-xl font-display px-7'>Campaigns</a>
				</Link>

				<button className='bg-blue-700 h-full'>
					<PlusIcon className='h-full w-20 p-5 text-white' />
				</button>
			</div>
		</header>
	);
}
