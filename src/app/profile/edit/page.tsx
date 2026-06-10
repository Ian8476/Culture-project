import type { Metadata } from 'next';
import { ProfileEditForm } from '@/features/profile';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.PROFILE_EDIT };

export default function ProfileEditPage() {
  return <ProfileEditForm />;
}
