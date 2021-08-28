import React, { useEffect } from 'react';
import factory from '../services/factory';

export default function CampaignList() {
	useEffect(() => {
		(async () => {
			const campaign = await factory.methods.getDeployedCampaigns().call();
		})();
	});

	return (
		<div>
			<h1>Campaign List</h1>
		</div>
	);
}
