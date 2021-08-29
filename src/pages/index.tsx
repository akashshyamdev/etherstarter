import React, { useEffect } from 'react';
import Link from 'next/link';
import factory from '../services/factory';
import Heading from '../components/Heading';

export async function getServerSideProps(context) {
	const campaigns = await factory.methods?.getCampaigns().call();

	return {
		props: { campaigns },
	};
}

export default function CampaignList({ campaigns }) {
	useEffect(() => {
		(async () => {
			console.log(campaigns);
		})();
	});

	return (
		<>
			<div className='flex flex-row justify-between'>
				<Heading>Campaign List</Heading>
			</div>

			<div className='w-3/5'>
				{campaigns.map((address: string) => (
					<div key={address} className='border rounded-lg px-7 py-7'>
						<h4 className='text-2xl'>{address}</h4>

						<Link href={`/campaigns/${address}`}>
							<a className='text-blue-600 mt-5'>View Campaign</a>
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
