'use client';

import { TopRatedShowsListSection } from '@/components/features/shows/TopRatedShowsListSection/TopRatedShowsListSection';
import { AuthRedirect } from '@/components/shared/navigation/AuthRedirect/AuthRedirect';

export default function TopRatedShowsPage() {
	return (
		<>
			<AuthRedirect to="/login" condition="isLoggedOut" />
			<TopRatedShowsListSection />
		</>
	);
}
