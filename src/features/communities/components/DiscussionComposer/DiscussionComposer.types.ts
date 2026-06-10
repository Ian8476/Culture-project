export interface DiscussionComposerProps {
  subgenreSlug: string;
  interestSlug: string;
  onCreated: () => void;
  onCancel: () => void;
}
