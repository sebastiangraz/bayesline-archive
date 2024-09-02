import { useEffect, useState } from 'react';
import style from './brand.module.css';
import { Button } from '@/components';

interface FileDownloadProps {
  file: string;
}

const files = import.meta.glob('@/assets/*', { eager: true }) as Record<string, { default: string }>;

export const FileDownload = ({ file }: FileDownloadProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const matchedFile = Object.entries(files).find(([filePath]) => filePath.includes(file));
    if (matchedFile) {
      setFileUrl(matchedFile[1].default);
    } else {
      console.error(`File ${file} not found.`);
    }
  }, [file]);

  return (
    <div className={style.download}>
      {fileUrl ? (
        <a href={fileUrl} download={file}>
          <Button theme={1} onClick={() => {}}>
            Download {file}
          </Button>
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};
