// Barrel público de la feature communities. Las pages solo importan desde aquí.
export { CommunityExplorer } from './components/CommunityExplorer';
export { CommunityDetail } from './components/CommunityDetail';
export { DiscussionDetail } from './components/DiscussionDetail';

export type {
  DiscussionFormValues,
  CommentFormValues,
  CommunityInfo,
} from './types/communities.types';
