import React from 'react';

import Link from 'next/link';
import factory from '../services/factory';
import Heading from '../components/Heading';
import createCampaignInstance from '../services/campaign';

export async function getServerSideProps(context) {
	const campaignAddresses = await factory.methods?.getCampaigns().call();
	const campaignsPromises = campaignAddresses.map((address) => createCampaignInstance(address));

	const rawCampaigns = await Promise.all(campaignsPromises);

	const rawCampaignsPromises = rawCampaigns.map(async (campaign: any) => ({
		name: await campaign.methods.name().call(),
		description: await campaign.methods.description().call(),
		address: campaign.options.address,
	}));

	const campaigns = await Promise.all(rawCampaignsPromises);

	return {
		props: { campaigns },
	};
}

export default function CampaignList({ campaigns }) {
	console.log(campaigns);
	return (
		<>
			<div className='flex flex-row justify-between'>
				<Heading>Campaign List</Heading>
			</div>

			<div className='w-3/5'>
				{campaigns.map(({ name, description, address }) => (
					<div key={address} className='border rounded-lg px-7 py-7'>
						<h4 className='text-3xl'>{name}</h4>
						<p className='text-lg mb-5'>{description}</p>

						<Link href={`/campaigns/${address}`}>
							<a className='text-blue-600'>View Campaign</a>
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
