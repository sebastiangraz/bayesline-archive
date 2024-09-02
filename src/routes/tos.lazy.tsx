import { TOS } from '@/pages/Tos';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/tos')({
  component: TOS
});
