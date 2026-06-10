import { CommunityDetail } from '@/features/communities';

interface CommunityPageProps {
  params: Promise<{ subgenreSlug: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { subgenreSlug } = await params;
  return <CommunityDetail subgenreSlug={subgenreSlug} />;
}
