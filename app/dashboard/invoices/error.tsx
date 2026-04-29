'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="flex flex-col justify-center items-center h-full">
			<h2 className="text-center">Something went wrong!</h2>
			<button
				className="bg-blue-500 hover:bg-blue-400 mt-4 px-4 py-2 rounded-md text-white text-sm transition-colors"
				onClick={
					// Attempt to recover by trying to re-render the invoices route
					() => reset()
				}
			>
				Try again
			</button>
		</main>
	);
}
