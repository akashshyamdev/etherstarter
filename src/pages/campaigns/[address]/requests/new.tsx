import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';
import web3 from '../../../../services/web3';
import Form from '../../../../components/Form';
import Heading from '../../../../components/Heading';
import createCampaignInstance from '../../../../services/campaign';
import Alert from '../../../../components/Alert';

export default function NewRequest() {
	const router = useRouter();
	const { address } = router.query;

	const [formData, setFormData] = useState({ description: '', amount: 0, receiver: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		setMessage('');

		const campaign = createCampaignInstance(address as string);

		try {
			const accounts = await web3.eth.getAccounts();

			const contractBalance = web3.utils.fromWei(await web3.eth.getBalance(campaign._address), 'ether');

			console.log(contractBalance);

			if (contractBalance < formData.amount) {
				setLoading(false);
				setMessage('Campaign money is less than amount required for this request. Try raising more money');
			} else {
				await campaign.methods
					.createRequest(formData.description, web3.utils.toWei(formData.amount, 'ether'), formData.receiver)
					.send({ from: accounts[0] });

				router.push(`/campaigns/${address}/requests`);
			}
		} catch (err) {
			setMessage(err.message);
			setLoading(false);
			setFormData({ description: '', amount: 0, receiver: '' });
		}
	};

	return (
		<div>
			<Heading>Create Request</Heading>
			{message && <Alert>{message}</Alert>}

			<Form
				loading={loading}
				onSubmit={onSubmit}
				formState={formData}
				setLoading={setLoading}
				setFormState={setFormData}
				data={[
					{ name: 'description', label: 'Description', placeholder: '' },
					{ name: 'amount', label: 'Amount(ether)', placeholder: '10', inputType: 'number' },
					{ name: 'receiver', label: 'Receiver', placeholder: '' },
				]}
			/>
		</div>
	);
}
