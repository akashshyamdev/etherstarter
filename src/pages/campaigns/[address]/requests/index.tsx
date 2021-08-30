import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import Heading from '../../../../components/Heading';

export default function Requests() {
	const router = useRouter();
	const { address } = router.query;

	return (
		<div>
			<Heading>Request List</Heading>

			<Link href={`/campaigns/${address}/requests/new`}>
				<a className='text-blue-600 mt-5'>View Campaign</a>
			</Link>
		</div>
	);
}
