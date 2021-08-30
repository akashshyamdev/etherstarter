import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import React, { MouseEventHandler } from 'react';

interface TableData {
	[key: string]: string;
}

interface TableProps {
	data: TableData[];
	className?: string;
	isManager?: boolean;
	onApprove: (index: number) => void;
}

export default function Table({ data, className, isManager, onApprove }: TableProps) {
	return (
		<table className={`${className}`}>
			<thead className='bg-gray-100 rounded-t-xl uppercase text-gray-700 font-thin font-sans tracking-wider'>
				{Object.keys(data[0]).map((key, index) => (
					<th className='bg-blue-100 border text-left px-8 py-4' key={index}>
						{key}
					</th>
				))}

				<th className='bg-blue-100 text-center border px-8 py-4'>Approve</th>

				{isManager && <th className='bg-blue-100 text-center border px-8 py-4'>Finalize</th>}
			</thead>

			<tbody>
				{data.map((row, rowIdx) => (
					<tr className='bg-gray-50' key={rowIdx}>
						{Object.values(row).map((value, colIdx) => (
							<td key={colIdx} className='border px-8 py-4'>
								{typeof value === 'string' ? (
									value
								) : value ? (
									<CheckCircleIcon className='w-5 h-5 mx-auto' />
								) : (
									<XCircleIcon className='w-5 h-5 mx-auto' />
								)}
							</td>
						))}

						<td className='border px-8 py-4'>
							<button
								type='submit'
								onClick={() => onApprove(rowIdx)}
								className='bg-green-400 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							>
								Approve Request
							</button>
						</td>

						{isManager && (
							<td className='border px-8 py-4'>
								<button
									type='submit'
									className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								>
									Finalize Request
								</button>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
