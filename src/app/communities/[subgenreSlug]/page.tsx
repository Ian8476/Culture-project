import type { Metadata } from 'next';
import { CommunityDetail } from '@/features/communities';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.COMMUNITY };

interface CommunityPageProps {
  params: Promise<{ subgenreSlug: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { subgenreSlug } = await params;
  return <CommunityDetail subgenreSlug={subgenreSlug} />;
}
