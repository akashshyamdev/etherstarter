import React from 'react';
import Form from '../../../../components/Form';
import Heading from '../../../../components/Heading';

export default function NewRequest() {
	const [formData, setFormData] = React.useState({ minContribution: 0 });
	const [loading, setLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');

	const onSubmit = () => {};

	return (
		<div>
			<Heading>Create Request</Heading>

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
