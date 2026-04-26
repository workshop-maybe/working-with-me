import styles from './CredentialToken.module.css';

type CredentialTokenProps = {
  partyA: string;
  partyB: string;
  id?: string;
  size?: 'default' | 'sm';
  variant?: 'default' | 'deep';
  sealLabel?: string;
};

export default function CredentialToken({
  partyA,
  partyB,
  id,
  size = 'default',
  variant = 'default',
  sealLabel,
}: CredentialTokenProps) {
  const firstA = partyA.split(' ')[0];
  const firstB = partyB.split(' ')[0];

  const classes = [
    styles.root,
    size === 'sm' ? styles.sm : '',
    variant === 'deep' ? styles.deep : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {id && <span className={styles.id}>{id}</span>}
      <span className={styles.hdr}>Connection</span>
      <span className={styles.pair}>
        {firstA}
        <span className={styles.ampersand}>&amp;</span>
        {firstB}
      </span>
      <span className={styles.seal}>{sealLabel}</span>
    </div>
  );
}
