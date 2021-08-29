import { useRouter } from 'next/dist/client/router';
import web3 from '../../services/web3';
import factory from '../../services/factory';
import React from 'react';
import Card from '../../components/Card';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import createCampaignInstance from '../../services/campaign';

interface CampaignDetailsProps {
	minimumContribution: number;
	balance: number;
	requestsCount: number;
	approversCount: number;
	manager: string;
}

export async function getServerSideProps(context) {
	const { address } = context.params;

	const campaign = createCampaignInstance(address);

	const summary = await campaign.methods.getSummary().call();

	return {
		props: {
			minimumContribution: summary['0'],
			balance: summary['1'],
			requestsCount: summary['2'],
			approversCount: summary['3'],
			manager: summary['4'],
			numStats: Object.keys(summary).length,
		},
	};
}

export default function CampaignDetails({
	balance,
	approversCount,
	manager,
	minimumContribution,
	requestsCount,
}: CampaignDetailsProps) {
	const router = useRouter();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');
	const [formData, setFormData] = React.useState({ contribution: 0 });

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		setMessage('');

		try {
			const accounts = await web3.eth.getAccounts();

			await factory.methods.createCampaign(formData.contribution).send({ from: accounts[0] });

			router.push('/');
		} catch (err) {
			setMessage(err.message);
			setLoading(false);
		}
	};

	return (
		<div>
			<Heading>Campaign Details</Heading>

			<div className='grid grid-cols-2 gap-x-16 gap-y-10'>
				<Card
					title={manager}
					subtitle='Address of Manager'
					content='The address of the manager who created this campaign and can create requests to withdraw money'
				/>

				<Card
					title={minimumContribution}
					subtitle='Minimum Contribution(wei)'
					content='You must contribute at least this much to become an approver'
				/>

				<Card
					title={requestsCount}
					subtitle='Number of Requests'
					content='Number of funding requests for various business purposes like buying inventory, conducting studies etc'
				/>

				<Card title={balance} subtitle='Funds Raised(ether)' content='Total funds raised till date' />
			</div>

			<div className='w-2/5'>
				<Form
					loading={loading}
					onSubmit={onSubmit}
					formState={formData}
					setLoading={setLoading}
					setFormState={setFormData}
					data={[{ name: 'contribution', label: 'Contribution(ether)', placeholder: '10', inputType: 'number' }]}
				/>
			</div>
		</div>
	);
}
