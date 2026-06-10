import type { Metadata } from 'next';
import { ProfileView } from '@/features/profile';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.PROFILE };

export default function ProfilePage() {
  return <ProfileView />;
}
