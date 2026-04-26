// Shared FAQ + footer + a recurring CredentialToken component
// — the credential artifact is brand-defining; appears in all 3 variations.

const { FAQ: FAQ_DATA } = window.WWM;

function CredToken({ a, b, id = "cred_88f", size = "lg" }) {
  // a, b are person-like {name, handle}
  return (
    <div className={"cred-token" + (size === "sm" ? " sm" : "")}>
      <span className="id">{id}</span>
      <div className="hdr">Connection</div>
      <div className="pair">
        <b>{a.name.split(" ")[0]}</b>
        <span className="ampersand">&amp;</span>
        <b>{b.name.split(" ")[0]}</b>
      </div>
      <div className="seal" />
    </div>
  );
}
window.CredToken = CredToken;

function FaqBlock() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label muted"><span className="dot" />Questions</span>
          <h2>Everything <em>else</em>.</h2>
        </div>
        <div className="faq-list">
          {FAQ_DATA.map((f, i) => (
            <div className="faq-row" key={i}>
              <div className="q">{f.q}</div>
              <div className="a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FaqBlock = FaqBlock;

function SiteFoot() {
  return (
    <footer className="site-foot">
      <div className="sf-grid">
        <div className="sf-brand">
          <div className="name"><WwmMark size={28} /> Working with Me</div>
          <p className="tag">A network for posting what you are working on, accepting commitments from others, and minting the connections that follow.</p>
          <a className="built" href="#"><img src="ds/andamio-logo-mark.png" alt="" /> Built on Andamio</a>
        </div>
        <div className="sf-cols">
          <div className="sf-col">
            <h4>Network</h4>
            <ul>
              <li><a href="#">Browse Assignments</a></li>
              <li><a href="#">Recent Connections</a></li>
              <li><a href="#">Spotlights</a></li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>For authors</h4>
            <ul>
              <li><a href="#">Post an Assignment</a></li>
              <li><a href="#">Configure commitments</a></li>
              <li><a href="#">Templates</a></li>
            </ul>
          </div>
          <div className="sf-col">
            <h4>Protocol</h4>
            <ul>
              <li><a href="#">Connection API</a></li>
              <li><a href="#">Webhooks</a></li>
              <li><a href="#">Open spec</a></li>
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
window.SiteFoot = SiteFoot;
