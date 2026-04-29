import '@/app/ui/global.css';
import { inter } from './ui/fonts';

/**
 *
 * Next.js downloads font files at build time and hosts them with your other static assets.
 * This means when a user visits your application,
 * there are no additional network requests for fonts which would impact performance.
 *
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s | Acme Dashboard',
		default: 'Acme Dashboard',
	},
	description: 'The official Next.js Learn Dashboard built with App Router.',
	metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}
