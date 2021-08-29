import React from 'react';
import web3 from '../../services/web3';
import factory from '../../services/factory';
import Heading from '../../components/Heading';

export default function NewCampaign() {
	const [amount, setAmount] = React.useState<number | null>(null);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const accounts = web3.eth.getAccounts();

		await factory.methods.createCampaign(amount).send({ from: accounts[0] });
	};

	return (
		<div>
			<Heading>New Campaign</Heading>

			<div className='w-full max-w-xs'>
				<form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
					<div className='mb-4'>
						<label
							className='block font-display tracking-wide text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'
						>
							Minimum Contribution(wei)
						</label>

						<input
							required
							id='username'
							type='number'
							value={amount}
							placeholder='1000'
							onChange={(e) => setAmount(parseInt(e.target.value))}
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						/>
					</div>

					<div className='flex items-center justify-between mt-10'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							Create Campaign
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
