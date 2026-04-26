import { COPY } from '@/lib/copy/vocabulary';

type Props = {
  builtOnAndamio?: boolean;
};

function BrandMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      width={28}
      height={28}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        strokeWidth="1.25"
        style={{ stroke: 'var(--ink)', fill: 'var(--paper)' }}
      />
      <circle
        cx="16"
        cy="16"
        r="10.5"
        strokeWidth="0.75"
        opacity="0.35"
        style={{ stroke: 'var(--ink)' }}
      />
      <circle
        cx="16"
        cy="16"
        r="6.5"
        strokeWidth="0.75"
        opacity="0.5"
        style={{ stroke: 'var(--ink)' }}
      />
      <circle cx="16" cy="16" r="3" style={{ fill: 'var(--signal)' }} />
    </svg>
  );
}

export default function SiteFooter({ builtOnAndamio = true }: Props) {
  return (
    <footer className="site-foot">
      <div className="sf-grid">
        <div className="sf-brand">
          <div className="name">
            <BrandMark /> Working with Me
          </div>
          <p className="tag">
            A network for posting what you are working on, accepting commitments
            from others, and minting the connections that follow.
          </p>
          {builtOnAndamio ? (
            <a className="built" href="#">
              <img
                src="/andamio-logo-mark.png"
                alt=""
                width={22}
                height={22}
              />{' '}
              Built on Andamio
            </a>
          ) : null}
        </div>
        <div className="sf-cols">
          <div className="sf-col">
            <h4>Network</h4>
            <ul>
              <li>
                <a href="#">Browse {COPY.assignments}</a>
              </li>
              <li>
                <a href="#">Recent {COPY.connections}</a>
              </li>
              <li>
                <a href="#">Spotlights</a>
              </li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>For authors</h4>
            <ul>
              <li>
                <a href="#">Post an {COPY.assignment}</a>
              </li>
              <li>
                <a href="#">Configure {COPY.commitments.toLowerCase()}</a>
              </li>
              <li>
                <a href="#">Templates</a>
              </li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>Protocol</h4>
            <ul>
              <li>
                <a href="#">{COPY.connection} API</a>
              </li>
              <li>
                <a href="#">Webhooks</a>
              </li>
              <li>
                <a href="#">Open spec</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sf-bot">
        <span>© 2026 · Working with Me</span>
        <span>Open · Cardano · v0.4</span>
      </div>
    </footer>
  );
}
