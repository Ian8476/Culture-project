import { DiscussionDetail } from '@/features/communities';

interface DiscussionPageProps {
  params: Promise<{ subgenreSlug: string; discussionId: string }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { subgenreSlug, discussionId } = await params;
  return <DiscussionDetail subgenreSlug={subgenreSlug} discussionId={discussionId} />;
}
