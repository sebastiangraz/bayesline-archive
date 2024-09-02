import { Markdown, Text } from '@/components';
import style from './privacy.module.css';

const content = import.meta.glob<string | string[] | any>(['./privacy.mdx'], {
  eager: true
});

export function Privacy() {
  const Content = content['./privacy.mdx'].default;

  return (
    <div className={`col bleed`}>
      <Markdown>
        <Content />
      </Markdown>
    </div>
  );
}
