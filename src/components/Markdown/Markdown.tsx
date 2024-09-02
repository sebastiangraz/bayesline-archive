import { MDXProvider } from '@mdx-js/react';
import { components } from './components';
import style from './markdown.module.css';

export const Markdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`col ${style.prose}`}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
};
