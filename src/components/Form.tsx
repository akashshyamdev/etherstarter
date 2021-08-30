import React, { FormEventHandler, InputHTMLAttributes } from 'react';
import Loader from './Loader';

interface FormData {
	name: string;
	label: string;
	placeholder: string;
	inputType?: InputHTMLAttributes<HTMLInputElement>['type'];
}

interface FormProps {
	loading: boolean;
	data: FormData[];
	formState: Object;
	className?: string;
	submitText: string;
	heading?: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
	setLoading: React.Dispatch<React.SetStateAction<FormProps['loading']>>;
	setFormState: React.Dispatch<React.SetStateAction<FormProps['formState']>>;
}

export default function Form({
	onSubmit,
	data,
	className,
	heading,
	submitText,
	formState,
	setFormState,
	loading,
	setLoading,
}: FormProps) {
	return (
		<form onSubmit={onSubmit} className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${className}`}>
			<h4 className='font-display text-3xl mb-5'>{heading}</h4>

			{data.map(({ label, placeholder, name, inputType }, i) => (
				<div className='mb-4' key={i}>
					<label className='block font-display tracking-wide text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
						{label}
					</label>

					<input
						required
						id={name}
						type={inputType || 'text'}
						value={formState[name]}
						placeholder={placeholder}
						onChange={(e) => setFormState({ ...formState, [name]: e.target.value })}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
			))}

			<div className='flex items-center justify-between mt-10'>
				{!loading ? (
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						{submitText}
					</button>
				) : (
					<Loader />
				)}
			</div>
		</form>
	);
}
