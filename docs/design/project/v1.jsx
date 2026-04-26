// V1 — SIGNAL FIELD
// Editorial warm baseline. Hero shows the active broadcasting field.
// Sample = profile screen + commit form. Inbox + network screens.

const { ASSIGNMENTS, CONNECTIONS, COMMITMENTS_INBOX, PEOPLE } = window.WWM;

function V1Hero() {
  return (
    <section className="v1-hero">
      <div className="container v1-hero-grid">
        <div>
          <span className="label"><span className="dot" />Network · v0.4 · open</span>
          <h1>
            What are you <em>working on</em>?<br/>
            Post a doc. Accept the people who <span className="signal">show up.</span>
          </h1>
          <p className="v1-hero-lede">
            <b>Working with Me</b> is a public network for the assignments you actually want help with. Anyone posts a doc; anyone files a commitment in the shape the author asked for; the author decides; an accepted commitment mints a portable connection.
          </p>
          <div className="v1-hero-ctas">
            <button className="btn btn-pri">Post an Assignment <Ico name="arrow" size={14} /></button>
            <button className="btn btn-out">Browse the network</button>
          </div>
        </div>
        <div className="v1-field">
          <svg className="rays" viewBox="0 0 600 520" preserveAspectRatio="none">
            <defs>
              <radialGradient id="v1ray" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1A4856" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#1A4856" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="380" cy="240" r="220" fill="url(#v1ray)" />
            <circle cx="380" cy="240" r="160" fill="none" stroke="#0D2A35" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3"/>
            <circle cx="380" cy="240" r="100" fill="none" stroke="#0D2A35" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4"/>
          </svg>
          {[
            { c: "b1", a: ASSIGNMENTS[1], wave: "live · 9 commitments" },
            { c: "b2", a: ASSIGNMENTS[0], wave: "open · 14" },
            { c: "b3", a: ASSIGNMENTS[4], wave: "live · 31" },
            { c: "b4", a: ASSIGNMENTS[3], wave: "1 slot left" },
            { c: "b5", a: ASSIGNMENTS[2], wave: "long-form · 22" },
          ].map((b) => (
            <div key={b.c} className={"v1-beacon " + b.c}>
              <div className="av">
                <span className="avatar sm" style={{ background: b.a.author.hue }}>{b.a.author.name[0]}</span>
                <span>{b.a.author.name.split(" ")[0]} · {b.a.author.where.split(" ")[0].replace(",","")}</span>
              </div>
              <h5>{b.a.title}</h5>
              <div className="wave">
                <span className="signal-wave"><span className="b"/><span className="b"/><span className="b"/><span className="b"/><span className="b"/><span className="b"/><span className="b"/></span>
                <span className="mono-tag">{b.wave}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function V1Sample() {
  const a = ASSIGNMENTS[0];
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot" />The shape of an Assignment</span>
          <h2>A working doc, <em>and the way</em> the author wants to be approached.</h2>
          <p className="lede">An Assignment is two things at once: a real piece of writing about the work, and a configurable form telling visitors exactly how to commit. The author writes the doc; the form is theirs to shape.</p>
        </div>
        <div className="v1-screens">
          {/* LEFT: profile screen */}
          <div className="v1-browser">
            <div className="top">
              <div className="dots"><span/><span/><span/></div>
              <div className="url">workingwith.me/<b>{a.author.handle}</b></div>
              <div className="mono-tag">⌘K</div>
            </div>
            <div className="body">
              <div className="v1-profile-head">
                <span className="avatar lg" style={{ background: a.author.hue }}>{a.author.name[0]}</span>
                <div className="who">
                  {a.author.name}
                  <small>{a.author.role} · {a.author.where}</small>
                </div>
                <span className="badge">7 connections</span>
              </div>
              <div className="v1-profile-body">
                <div className="label-row">Assignment {a.id} · posted {a.posted}</div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
                <p>{a.body}</p>
                <div className="pref">
                  <b>How I work</b>
                  {a.pref}
                </div>
                <div className="more-cta">
                  <Ico name="lock" size={16} />
                  <span>Two more notes are visible <b style={{color: "var(--ink)"}}>only to my connections</b>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: commit form */}
          <div className="v1-commit">
            <span className="label cream"><span className="dot"/>File a Commitment</span>
            <h4>What I would bring, in {a.author.name.split(" ")[0]}'s shape.</h4>
            <p>Mira asked for two things and a preference. The form mirrors that. No more, no less.</p>
            <div className="field">
              <label>Two papers in this area you've read</label>
              <div className="input">"Aker &amp; Mbiti, 2010" and "Olu &amp; Adesina, 2023 — informal credit in Aba"</div>
            </div>
            <div className="field">
              <label>One methodological objection you'd raise</label>
              <div className="input large">Your sample frame skips traders who only use rotating credit, who I'd argue are the most informative case for the policy question…</div>
            </div>
            <div className="field">
              <label>Working preference</label>
              <div className="input placeholder">Async, two-hour blocks, one weekly letter.</div>
            </div>
            <div className="interest">
              <span className="check"><Ico name="check" size={11} /></span>
              <div className="l">
                I am willing to be paid in connection only, for now.
                <small>Mira asked. Some commit, some don't. Up to you.</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn btn-cream btn-sm">Sign + send <Ico name="arrow" size={13} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Unlocks() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot" />What a Connection unlocks</span>
          <h2>The credential is small. The <em>access</em> it grants isn't.</h2>
        </div>
        <div className="v1-unlocks">
          <div className="v1-unlock-side">
            <CredToken a={PEOPLE[1]} b={PEOPLE[4]} id="cred_88f-7e2" />
          </div>
          <div className="v1-unlock-detail">
            <div className="point">
              <span className="ic"><Ico name="unlock" size={14} /></span>
              <div>
                <h4>The author's private companion</h4>
                <p>Each Assignment can ship with a private companion doc — context, budgets, the names that aren't on the public side — visible only to people the author has connected with.</p>
              </div>
            </div>
            <div className="point">
              <span className="ic"><Ico name="comment" size={14} /></span>
              <div>
                <h4>A direct line, both ways</h4>
                <p>Connections open a private thread. No DMs from strangers, no inbox sludge — only people the author chose to bring through.</p>
              </div>
            </div>
            <div className="point">
              <span className="ic"><Ico name="signal" size={14} /></span>
              <div>
                <h4>A portable signal</h4>
                <p>The connection lives in your wallet. Other apps can read it. "Connected to Mira" travels with you.</p>
              </div>
            </div>
            <div className="point">
              <span className="ic"><Ico name="doc" size={14} /></span>
              <div>
                <h4>Permission to cite</h4>
                <p>Authors can flag specific sentences as quotable-by-connections-only — research-grade attribution, with a chain trail.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Screens() {
  const a = ASSIGNMENTS[0];
  return (
    <section className="deep">
      <div className="container">
        <div className="s-head">
          <span className="label cream"><span className="dot" />Two views from inside</span>
          <h2>The author's <em>inbox</em>. The network's <em>memory</em>.</h2>
          <p className="lede">Two screens you'll spend time with: the queue of commitments waiting for your call, and a feed of the connections others have already made.</p>
        </div>
        <div className="v1-screens-deep">
          <div className="v1-screen-card">
            <div className="top">
              <span className="crumb">Inbox · <b>{a.title.slice(0, 36)}…</b></span>
              <span className="badge">3 waiting</span>
            </div>
            <div className="body">
              {COMMITMENTS_INBOX.map((c, i) => (
                <div className="v1-inbox-row" key={i}>
                  <span className="avatar" style={{ background: ["#1A4856","#4A6C30","#8B3A3A"][i] }}>{c.from.name[0]}</span>
                  <div>
                    <div className="meta">{c.from.name} <small>@{c.from.handle} · {c.t}</small></div>
                    <div className="msg">{c.msg}</div>
                    {c.interest && <div className="ix"><Ico name="check" size={11} /> Willing to commit on connection-only terms</div>}
                  </div>
                  <div className="acts">
                    <button className="ok" title="Accept"><Ico name="check" size={14} /></button>
                    <button className="no" title="Decline"><Ico name="x" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="v1-screen-card">
            <div className="top">
              <span className="crumb">Network · <b>recent connections</b></span>
              <span className="badge">live</span>
            </div>
            <div className="body">
              <div className="v1-network-grid">
                {CONNECTIONS.concat(CONNECTIONS).slice(0, 4).map((c, i) => (
                  <div className="v1-network-cell" key={i}>
                    <div className="pair">
                      <span className="avatar sm" style={{ background: c.a.hue }}>{c.a.name[0]}</span>
                      <span className="avatar sm" style={{ background: c.b.hue }}>{c.b.name[0]}</span>
                    </div>
                    <div className="ttl">
                      {c.a.name.split(" ")[0]} <em>&amp;</em> {c.b.name.split(" ")[0]}
                    </div>
                    <div className="when">on {c.asn} · {c.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V1CTA() {
  return (
    <section className="deep">
      <div className="container" style={{ textAlign: "center", display: "grid", gap: 32, justifyItems: "center" }}>
        <span className="label cream"><span className="dot"/>Read for free · post for free · commit for free</span>
        <h2 style={{ font: "400 clamp(2.5rem, 5vw, 4.5rem)/1.05 var(--serif)", margin: 0, color: "var(--on-deep)", letterSpacing: "-0.02em", maxWidth: "20ch", textWrap: "balance" }}>
          Tell the network <em style={{ color: "var(--signal-soft)", fontStyle: "italic" }}>what you're working on.</em>
        </h2>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-cream">Post an Assignment <Ico name="arrow" size={14}/></button>
          <button className="btn btn-cream-out">Read the open spec</button>
        </div>
      </div>
    </section>
  );
}

function V1() {
  return (
    <div className="v1">
      <header><nav className="nav">
        <div className="nav-logo"><WwmMark size={24}/> Working with Me</div>
        <div className="nav-links">
          <a href="#">Network</a>
          <a href="#">For authors</a>
          <a href="#">Spec</a>
          <button className="btn btn-out btn-sm">Connect wallet</button>
        </div>
      </nav></header>
      <V1Hero />
      <V1Sample />
      <V1Unlocks />
      <V1Screens />
      <FaqBlock />
      <V1CTA />
      <SiteFoot />
    </div>
  );
}
window.V1 = V1;
