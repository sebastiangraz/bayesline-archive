import { Markdown, Text } from '@/components';
import style from './tos.module.css';

const content = import.meta.glob<string | string[] | any>(['./tos.mdx'], {
  eager: true
});

export function TOS() {
  const Content = content['./tos.mdx'].default;

  return (
    <div className={`col bleed`}>
      <Markdown>
        <Content />
      </Markdown>
    </div>
  );
}
