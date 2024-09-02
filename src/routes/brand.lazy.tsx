import { Brand } from '@/pages/Brand';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/brand')({
  component: Brand
});
