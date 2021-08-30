import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main className='w-full text-gray-700 py-10 px-20 font-sans'>{children}</main>
		</>
	);
}
