import type { Metadata } from 'next';
import { CommunityExplorer } from '@/features/communities';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.COMMUNITIES };

export default function CommunitiesPage() {
  return <CommunityExplorer />;
}
