import style from './markdown.module.css';
import { Icon, Img, Text } from '@/components';
import { isArrayofObjects } from '@/helpers/utils';

export const components = {
  h1: (props: any) => (
    <div className={`${style.chapterHeader}`}>
      <h1 {...props}></h1>
      <Text.Body>{props.children}</Text.Body>
    </div>
  ),
  h2: (props: any) => <Text.H2 {...props}>{props.children}</Text.H2>,
  h3: (props: any) => <Text.H3 {...props}>{props.children}</Text.H3>,
  h4: (props: any) => <Text.H4 {...props}>{props.children}</Text.H4>,
  h5: (props: any) => <Text.H5 {...props}>{props.children}</Text.H5>,
  p: (props: any) => (
    <Text.Body secondary {...props}>
      {props.children}
    </Text.Body>
  ),
  aside: (props: any) => (
    <p className={`aside ${style.aside}`} {...props}>
      {props.children}
    </p>
  ),
  blockquote: (props: any) => (
    <div className={`blockquote ${style.blockquote}`}>
      <Icon name="quote" small secondary style={{ transform: 'translate(-0.5px, -0.75px)' }} />
      <Text.Body {...props}>{props.children}</Text.Body>
    </div>
  ),
  table: (props: any) => {
    let firstChildProps;
    if (isArrayofObjects(props.children)) {
      firstChildProps = props.children[0];
    } else {
      firstChildProps = props.children;
    }
    const columns = firstChildProps?.props?.children?.props?.children;
    return (
      <div className={`${style.table}`}>
        <table {...props} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {props.children}
        </table>
      </div>
    );
  },
  code: (props: any) => {
    return <code className={`${style.code}`} {...props}></code>;
  },
  img: (props: any) => {
    return <img className={`${style.image}`} {...props}></img>;
  },
  ul: (props: any) => {
    return <ul className={`${style.unorderedList}`} {...props}></ul>;
  },
  ol: (props: any) => {
    return <ol className={`${style.orderedList}`} {...props}></ol>;
  },
  li: (props: any) => {
    return <li className={`${style.listItem}`} {...props}></li>;
  }
};
