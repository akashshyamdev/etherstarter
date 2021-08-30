import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import Heading from '../../../../components/Heading';

export default function Requests() {
	const router = useRouter();
	const { address } = router.query;

	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<Heading style={{ marginBlockEnd: '0' }}>Request List</Heading>

				<Link href={`/campaigns/${address}/requests/new`}>
					<a className='text-blue-600 text-2xl mt-5'>Create Request</a>
				</Link>
			</div>
		</div>
	);
}
