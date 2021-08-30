import React from 'react';
import web3 from '../../services/web3';
import factory from '../../services/factory';
import Heading from '../../components/Heading';
import Alert from '../../components/Alert';
import { useRouter } from 'next/dist/client/router';
import Form from '../../components/Form';

export default function NewCampaign() {
	const router = useRouter();

	const [formData, setFormData] = React.useState({ minContribution: 0 });
	const [loading, setLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		setMessage('');

		try {
			const accounts = await web3.eth.getAccounts();

			await factory.methods.createCampaign(formData.minContribution).send({ from: accounts[0] });

			router.push('/');
		} catch (err) {
			setMessage(err.message);
			setLoading(false);
		}
	};

	return (
		<div>
			<Heading>New Campaign</Heading>

			{message && <Alert>{message}</Alert>}

			<div className='w-full max-w-xs mt-10'>
				<Form
					loading={loading}
					onSubmit={onSubmit}
					formState={formData}
					setLoading={setLoading}
					setFormState={setFormData}
					submitText='Create Campaign'
					data={[
						{ name: 'minContribution', label: 'Minimum Contribution(wei)', placeholder: '1000', inputType: 'number' },
					]}
				/>
			</div>
		</div>
	);
}
