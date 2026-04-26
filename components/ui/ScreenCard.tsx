import type { ReactNode } from 'react';
import styles from './ScreenCard.module.css';

type ScreenCardProps = {
  crumb: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
};

export default function ScreenCard({ crumb, badge, children }: ScreenCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <span className={styles.crumb}>{crumb}</span>
        {badge !== undefined && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
