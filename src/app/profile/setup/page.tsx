import type { Metadata } from 'next';
import { ProfileSetupForm } from '@/features/profile';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.PROFILE_SETUP };

export default function ProfileSetupPage() {
  return <ProfileSetupForm />;
}
