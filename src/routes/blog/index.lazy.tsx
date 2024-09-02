import { createLazyFileRoute } from '@tanstack/react-router';
import { Blog } from '@/pages/Blog';

export const Route = createLazyFileRoute('/blog/')({
  component: Blog
});
