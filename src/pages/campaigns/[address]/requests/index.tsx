import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import web3 from '../../../../services/web3';
import React from 'react';
import createCampaignInstance from '../../../../services/campaign';
import Heading from '../../../../components/Heading';
import Table from '../../../../components/Table';

export async function getServerSideProps({ query }) {
	const campaign = await createCampaignInstance(query.address);

	const numberOfRequests = campaign.methods.getRequestsCount().call();
	const funders = await campaign.methods.approversCount().call();

	const requestsArr = await Promise.all(
		Array(numberOfRequests)
			.fill(numberOfRequests)
			.map((_, index) => campaign.methods.requests(index).call())
	);

	const requests = requestsArr.map(({ recipient, description, value, approvalCount, complete }) => ({
		recipient,
		description,
		value: web3.utils.fromWei(value, 'ether'),
		'approval Count': `${approvalCount} / ${funders}`,
		completed: complete,
	}));

	console.log(requests);
	return { props: { requests } };
}

export default function Requests({ requests }) {
	const router = useRouter();
	const { address } = router.query;

	console.log(requests);

	const onApprove = async (rowIdx: number) => {
		const campaign = await createCampaignInstance(address as string);

		const accounts = await web3.eth.getAccounts();

		await campaign.methods.approveRequest(rowIdx).send({ from: accounts[0] });
	};

	return (
		<div>
			<div className='flex flex-row justify-between items-center'>
				<Heading style={{ marginBlockEnd: '0' }}>Request List</Heading>

				<Link href={`/campaigns/${address}/requests/new`}>
					<a className='text-blue-600 text-2xl mt-5'>Create Request</a>
				</Link>
			</div>

			<Table data={requests} className='mt-10' isManager={true} onApprove={onApprove} />
		</div>
	);
}
