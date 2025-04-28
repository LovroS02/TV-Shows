'use client';

import { ProfileSection } from '@/components/features/profile/ProfileSection/ProfileSection';
import { AuthRedirect } from '@/components/shared/navigation/AuthRedirect/AuthRedirect';

export default function ProfilePage() {
	return (
		<>
			<AuthRedirect to="/login" condition="isLoggedOut" />
			<ProfileSection />
		</>
	);
}
