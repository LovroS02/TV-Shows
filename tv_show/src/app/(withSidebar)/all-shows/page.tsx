'use client';

import { ShowsListSection } from '@/components/features/shows/ShowsListSection/ShowsListSection';
import { AuthRedirect } from '@/components/shared/navigation/AuthRedirect/AuthRedirect';

export default function ShowsListPage() {
	return (
		<>
			<AuthRedirect to="/login" condition="isLoggedOut" />
			<ShowsListSection />
		</>
	);
}
