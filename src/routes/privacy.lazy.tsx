import { Privacy } from '@/pages/Privacy';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/privacy')({
  component: Privacy
});
