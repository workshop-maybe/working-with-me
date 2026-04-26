import type { ReactNode } from 'react';
import styles from './BrowserCard.module.css';

type BrowserCardProps = {
  url: string;
  urlPrefix?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
};

export default function BrowserCard({
  url,
  urlPrefix = 'workingwith.me/',
  rightSlot,
  children,
}: BrowserCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.url}>
          {urlPrefix}
          <b>{url}</b>
        </span>
        {rightSlot}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
