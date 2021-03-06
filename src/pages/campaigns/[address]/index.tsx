import { useRouter } from 'next/dist/client/router';
import web3 from '../../../services/web3';
import factory from '../../../services/factory';
import React from 'react';
import Card from '../../../components/Card';
import Form from '../../../components/Form';
import Heading from '../../../components/Heading';
import createCampaignInstance from '../../../services/campaign';
import Alert from '../../../components/Alert';
import Link from 'next/link';

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
	const { address } = router.query;

	const [loading, setLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');
	const [formData, setFormData] = React.useState({ contribution: 0 });

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		setMessage('');

		const campaign = createCampaignInstance(address as string);

		try {
			const accounts = await web3.eth.getAccounts();

			await campaign.methods
				.contribute()
				.send({ from: accounts[0], value: web3.utils.toWei(formData.contribution, 'ether') });

			setLoading(false);
			router.replace(`/campaigns/${address}`);
		} catch (err) {
			setMessage(err.message);
			setFormData({ ...formData, contribution: 0 });
			setLoading(false);
		}
	};

	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<Heading className='mb-0' style={{ marginBlockEnd: '0px' }}>
					Campaign Details
				</Heading>

				<Link href={`/campaigns/${address}/requests`}>
					<a className='text-blue-600 text-2xl mt-5'>Request List</a>
				</Link>
			</div>

			<div className='flex flex-row mt-16'>
				{/* Cards */}
				<div className='grid grid-cols-2 gap-x-16 gap-y-10 w-3/5'>
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

					<Card
						title={approversCount}
						subtitle='Number of Contributors'
						content='Number of people who have contributed in the campaign and support it.'
					/>

					<Card
						title={web3.utils.fromWei(balance, 'ether')}
						subtitle='Funds Raised(ether)'
						content='Total funds raised till date'
					/>
				</div>

				{/* Contribute Form */}
				<div className='w-2/5 pl-20'>
					{message && <Alert className='mb-5'>{message}</Alert>}

					<Form
						loading={loading}
						onSubmit={onSubmit}
						formState={formData}
						className='border-2'
						setLoading={setLoading}
						setFormState={setFormData}
						submitText='Contribute Now'
						heading='Contribute'
						data={[
							{
								name: 'contribution',
								label: 'Amount to Contribute(ether)',
								placeholder: '10',
								inputType: 'number',
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
