import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router';
import { entryMeta } from '@/pages/Blog/entryMeta';
import { BlogEntry } from '@/pages/BlogEntry';

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div>
      <h3>404</h3>
      <ErrorComponent error={error} />
    </div>
  );
}

export const Route = createFileRoute('/blog/$postId')({
  component: BlogEntry,
  beforeLoad: ({ params }) => {
    const post = entryMeta.find((p) => p.id === params.postId);
    const title = post?.title;
    const description = post?.excerpt;

    return {
      themeValue: post?.theme,
      title: title,
      description: description
    };
  },
  loader: async ({ params }) => {
    const post = entryMeta.find((p) => p.id === params.postId);
    if (!post) throw new Error('Post not found');
    return { post };
  },
  errorComponent: PostErrorComponent as any,
  notFoundComponent: () => {
    return <p>Post not found</p>;
  }
});
