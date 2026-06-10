import type { Metadata } from 'next';
import { DiscussionDetail } from '@/features/communities';
import { PAGE_TITLES } from '@/shared/constants/app.constants';

export const metadata: Metadata = { title: PAGE_TITLES.DISCUSSION };

interface DiscussionPageProps {
  params: Promise<{ subgenreSlug: string; discussionId: string }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { subgenreSlug, discussionId } = await params;
  return <DiscussionDetail subgenreSlug={subgenreSlug} discussionId={discussionId} />;
}
