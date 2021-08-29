import React, { useEffect } from 'react';
import factory from '../services/factory';

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
		<div>
			<h1 className='text-red-500'>Campaign List</h1>
			{campaigns.map((address: string) => (
				<h4 className='text-red-500'>{address}</h4>
			))}
		</div>
	);
}
