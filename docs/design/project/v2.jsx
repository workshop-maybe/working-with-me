// V2 — INDEX CARD STACK
// Tactile, paper-feel, blueprint grid. Hero is rotated index cards.
// Sample: hole-punched binder doc + tear-off commitment slip.

const { ASSIGNMENTS: A2, PEOPLE: P2 } = window.WWM;

function V2Hero() {
  return (
    <section className="v2-hero">
      <div className="container v2-hero-grid">
        <div>
          <span className="label"><span className="dot" />A multi-tenant network</span>
          <h1>
            Working with me <em>is</em> the document.<br/>
            <u>You write it.</u> Others commit.
          </h1>
          <p className="v2-hero-lede">
            Each person on the network has a single page that says, in their own words, what they are working on right now and how to come find them. Anyone can file a Commitment in the shape that page asked for.
          </p>
          <div className="v2-hero-ctas">
            <button className="btn btn-pri">Write your page <Ico name="arrow" size={14} /></button>
            <button className="btn btn-out">See ten people writing right now</button>
          </div>
        </div>
        <div className="v2-stack">
          <div className="v2-card c1">
            <div className="top">
              <span className="id-tag">{A2[1].id} · {A2[1].posted}</span>
              <span className="stamp">9 commits</span>
            </div>
            <h4>{A2[1].title}</h4>
            <div className="ruled-line" />
            <div className="ruled-line short" />
            <div className="meta">
              <span className="avatar" style={{ background: A2[1].author.hue }}>{A2[1].author.name[0]}</span>
              {A2[1].author.name} · {A2[1].author.where}
            </div>
          </div>
          <div className="v2-card c2">
            <div className="top">
              <span className="id-tag">{A2[0].id} · {A2[0].posted}</span>
              <span className="stamp">14 commits</span>
            </div>
            <h4>{A2[0].title}</h4>
            <div className="ruled-line" />
            <div className="ruled-line short" />
            <div className="meta">
              <span className="avatar" style={{ background: A2[0].author.hue }}>{A2[0].author.name[0]}</span>
              {A2[0].author.name} · {A2[0].author.where}
            </div>
          </div>
          <div className="v2-card c3">
            <div className="top">
              <span className="id-tag">{A2[4].id} · {A2[4].posted}</span>
              <span className="stamp">31 commits</span>
            </div>
            <h4>{A2[4].title}</h4>
            <div className="ruled-line" />
            <div className="ruled-line short" />
            <div className="meta">
              <span className="avatar" style={{ background: A2[4].author.hue }}>{A2[4].author.name[0]}</span>
              {A2[4].author.name} · {A2[4].author.where}
            </div>
          </div>
          <div className="v2-stamp-circle">
            <div><b>×42</b>open</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2Sample() {
  const a = A2[0];
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot" />The shape of it</span>
          <h2>One page per author. <em>Two halves.</em></h2>
          <p className="lede">The page is the working doc. The slip is the form for committing — author-shaped, every time. The page lives in the open. The slip lands in the author's inbox.</p>
        </div>
        <div className="v2-sample">
          <div className="v2-binder">
            <div className="holes"><span/><span/><span/><span/><span/></div>
            <div className="head">
              <div className="who">
                <span className="avatar lg" style={{ background: a.author.hue }}>{a.author.name[0]}</span>
                <div className="meta">
                  {a.author.name}
                  <small>{a.author.role} · {a.author.where}</small>
                </div>
              </div>
              <div className="id-stack">
                {a.id}<br/>
                {a.posted}<br/>
                <span style={{ color: "var(--signal)" }}>14 commitments</span>
              </div>
            </div>
            <div className="body">
              <div className="label-row">What I am working on</div>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <p>{a.body}</p>
            </div>
            <div className="pref">
              <b>HOW</b>{a.pref}
            </div>
          </div>
          <div className="v2-slip">
            <span className="label cream"><span className="dot"/>Tear off · file a Commitment</span>
            <h4>This is the form Mira asked for.</h4>
            <p>Three fields and a yes/no. The author sets these on their page; this slip mirrors them.</p>
            <div className="field">
              <label>TWO PAPERS YOU'VE READ</label>
              <div className="input">"Aker &amp; Mbiti, 2010" + "Olu, 2023"</div>
            </div>
            <div className="field">
              <label>ONE OBJECTION</label>
              <div className="input large">Your sample frame skips traders who only use rotating credit, who I'd argue are the most informative case…</div>
            </div>
            <div className="field">
              <label>WORKING PREFERENCE</label>
              <div className="input placeholder">Async, two-hour blocks, weekly letter</div>
            </div>
            <div className="actions">
              <span>Signed by your wallet</span>
              <button className="btn btn-cream btn-sm">File <Ico name="arrow" size={13}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V2Wall() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot"/>On the network right now</span>
          <h2>Six people. Six <em>working pages.</em></h2>
          <p className="lede">A small cross-section of the network. Click any author and read their page; if their work resonates, file a slip in the form they asked for.</p>
        </div>
        <div className="v2-wall">
          {A2.map((a) => (
            <article className="v2-wcard" key={a.id}>
              <div className="top-row">
                <span>{a.id}</span>
                <span><b>{a.commitments}</b> · {a.open} open</span>
              </div>
              <h4>{a.title}</h4>
              <p>{a.summary.slice(0, 130)}…</p>
              <div className="tags">
                {a.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="who">
                <span className="avatar" style={{ background: a.author.hue }}>{a.author.name[0]}</span>
                <span>
                  {a.author.name}
                  <small>{a.author.role} · {a.author.where}</small>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function V2Keep() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot"/>What you keep</span>
          <h2>One token. <em>Five doors</em> it opens.</h2>
        </div>
        <div className="v2-keep">
          <div className="keep-left">
            <CredToken a={P2[1]} b={P2[4]} id="cred_88f-7e2"/>
          </div>
          <div className="keep-list">
            {[
              { n: "i", h: "The author's private companion", b: "Each Assignment can ship with a connection-only addendum — budgets, the names that aren't on the public side, the actual rates of pay." },
              { n: "ii", h: "A thread, both directions", b: "A direct line that won't be drowned by strangers — only people the author personally brought through can write." },
              { n: "iii", h: "A signal that travels", b: "The connection lives in your wallet. Other apps read it. \"Connected to Mira\" comes with you." },
              { n: "iv", h: "Permission to cite", b: "Authors can flag specific lines as quotable-by-connections-only. Research-grade attribution, with a chain trail." },
              { n: "v",  h: "A standing invitation back", b: "Once you have a Connection, the author's future Assignments are visible to you the moment they post." },
            ].map((r) => (
              <div className="keep-row" key={r.n}>
                <span className="num">{r.n}</span>
                <div>
                  <h4>{r.h}</h4>
                  <p>{r.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function V2CTA() {
  return (
    <section className="deep">
      <div className="container" style={{ textAlign: "center", display: "grid", gap: 32, justifyItems: "center" }}>
        <span className="label cream"><span className="dot"/>Free · open · Cardano · v0.4</span>
        <h2 style={{ font: "400 clamp(2.5rem, 5vw, 4.5rem)/1.05 var(--serif)", margin: 0, color: "var(--on-deep)", letterSpacing: "-0.02em", maxWidth: "22ch", textWrap: "balance" }}>
          Write the page only <em style={{ color: "var(--signal-soft)", fontStyle: "italic" }}>you</em> can write.
        </h2>
        <p style={{ maxWidth: "44ch", color: "var(--on-deep-mute)", font: "400 17px/1.55 var(--sans)" }}>
          The network is small on purpose. The form is yours to shape. The connections are yours to keep.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-cream">Start your page <Ico name="arrow" size={14}/></button>
          <button className="btn btn-cream-out">Read the spec</button>
        </div>
      </div>
    </section>
  );
}

function V2() {
  return (
    <div className="v2">
      <header><nav className="nav">
        <div className="nav-logo"><WwmMark size={24}/> Working with Me</div>
        <div className="nav-links">
          <a href="#">Network</a>
          <a href="#">For authors</a>
          <a href="#">Spec</a>
          <button className="btn btn-out btn-sm">Connect wallet</button>
        </div>
      </nav></header>
      <V2Hero />
      <V2Sample />
      <V2Wall />
      <V2Keep />
      <FaqBlock />
      <V2CTA />
      <SiteFoot />
    </div>
  );
}
window.V2 = V2;
