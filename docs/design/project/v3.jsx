// V3 — LIVE TICKER
// Network-first, system feel. Live console, dense table, diagrammed credential.

const { ASSIGNMENTS: A3, PEOPLE: P3 } = window.WWM;

const FEED = [
  { t: "12:42",  ev: "+", kind: "post",   who: "Mira Okafor",        body: "posted ", strong: "wwm-001 · Mapping informal credit networks", id: "blk_8129a7" },
  { t: "12:38",  ev: "▶", kind: "commit", who: "ada.k",              body: "filed Commitment on ", strong: "wwm-001", id: "tx_44e810" },
  { t: "12:31",  ev: "✦", kind: "mint",   who: "Tomás × Hannah",     body: "Connection minted on ", strong: "wwm-005", id: "cred_a1f9" },
  { t: "12:24",  ev: "▶", kind: "commit", who: "patrick.o",          body: "filed Commitment on ", strong: "wwm-001", id: "tx_44e7d2" },
  { t: "12:18",  ev: "+", kind: "post",   who: "Tomás Ribeiro",      body: "posted ", strong: "wwm-002 · Verifiable supply-chain attestations", id: "blk_8128c1" },
  { t: "12:11",  ev: "▶", kind: "commit", who: "saoirse.k",          body: "filed Commitment on ", strong: "wwm-001", id: "tx_44e6a4" },
  { t: "12:02",  ev: "✦", kind: "mint",   who: "Aiyana × Diego",     body: "Connection minted on ", strong: "wwm-006", id: "cred_a1f7" },
  { t: "11:58",  ev: "+", kind: "post",   who: "Hannah Lindqvist",   body: "posted ", strong: "wwm-005 · Soil carbon for smallholders", id: "blk_8127f3" },
  { t: "11:51",  ev: "▶", kind: "commit", who: "j.lebowski",         body: "filed Commitment on ", strong: "wwm-005", id: "tx_44e421" },
  { t: "11:44",  ev: "✦", kind: "mint",   who: "Kenji × Mira",       body: "Connection minted on ", strong: "wwm-001", id: "cred_a1f3" },
  { t: "11:32",  ev: "▶", kind: "commit", who: "rosa.k",             body: "filed Commitment on ", strong: "wwm-003", id: "tx_44e2ba" },
  { t: "11:18",  ev: "+", kind: "post",   who: "Diego Saavedra",     body: "posted ", strong: "wwm-006 · Scoring a corridos documentary", id: "blk_8126d9" },
];

function V3Hero() {
  const [filter, setFilter] = React.useState("all");
  const rows = filter === "all" ? FEED : FEED.filter((f) => f.kind === filter);

  return (
    <section className="v3-hero">
      <div className="container v3-hero-grid">
        <div>
          <span className="label"><span className="dot" />Public network · Cardano · v0.4</span>
          <h1>The network is <em>broadcasting</em> right now. <span className="live">live</span></h1>
          <p className="v3-hero-lede">
            Working with Me is a public log of three things: <b style={{color: "var(--ink)"}}>posts</b> (someone's working doc), <b style={{color: "var(--ink)"}}>commitments</b> (someone showing up), and <b style={{color: "var(--ink)"}}>connections</b> (the credential that follows). Every event lands on chain. Every author keeps the call.
          </p>
          <div className="v3-hero-stats">
            <div className="stat">
              <div className="num">218</div>
              <div className="lbl">Open Assignments</div>
            </div>
            <div className="stat">
              <div className="num">1.4k</div>
              <div className="lbl">Commitments filed</div>
            </div>
            <div className="stat">
              <div className="num">312</div>
              <div className="lbl">Connections minted</div>
            </div>
          </div>
          <div className="v3-hero-ctas">
            <button className="btn btn-pri">Post an Assignment <Ico name="arrow" size={14} /></button>
            <button className="btn btn-ghost">Browse the feed</button>
          </div>
        </div>
        <div className="v3-console">
          <div className="head">
            <div className="l"><span className="live-dot"/>Live · global feed</div>
            <div className="filters">
              {[["all","ALL"],["post","POSTS"],["commit","COMMITS"],["mint","MINTED"]].map(([k, lbl]) => (
                <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{lbl}</button>
              ))}
            </div>
          </div>
          <div className="feed">
            {rows.slice(0, 11).map((r, i) => (
              <div className={"row " + r.kind} key={i}>
                <span className="t">{r.t}</span>
                <span className="ev">{r.ev}</span>
                <span className="body"><span className="who">{r.who}</span> {r.body}<b>{r.strong}</b></span>
                <span className="id">{r.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function V3Anatomy() {
  const a = A3[0];
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot" />Anatomy of an Assignment</span>
          <h2>Two records. One on the network, <em>one in the author's hand.</em></h2>
          <p className="lede">Every Assignment is a public record on chain (the working doc, plus the schema of the form). Every Commitment is a record signed by the visitor. The author reviews, accepts, declines.</p>
        </div>
        <div className="v3-anatomy">
          <div className="v3-doc">
            <div className="top">
              <span><b>{a.id}</b> · public · {a.posted}</span>
              <span className="pill">14 commitments · 4 open</span>
            </div>
            <div className="body">
              <div className="author-line">
                <span className="avatar" style={{ background: a.author.hue }}>{a.author.name[0]}</span>
                <span>{a.author.name} <small>· {a.author.role} · {a.author.where}</small></span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <p className="muted">{a.body}</p>
              <div className="schema">
                <div className="k"><span className="key">commitment</span><span className="val">{"{"}</span></div>
                <div className="k"><span className="key">  fields</span><span className="val"><span className="str">"two_papers"</span>, <span className="str">"one_objection"</span>, <span className="str">"preference"</span></span></div>
                <div className="k"><span className="key">  toggle</span><span className="val"><span className="str">"connection_only_terms"</span></span></div>
                <div className="k"><span className="key">  visible_to</span><span className="val"><span className="str">"author"</span></span></div>
                <div className="k"><span className="key">{"}"}</span><span/></div>
              </div>
            </div>
          </div>
          <div className="v3-form">
            <div className="top">
              <span>Commitment · draft</span>
              <span className="right">unsigned</span>
            </div>
            <div className="body">
              <h4>The form Mira asked for</h4>
              <p>Three fields, one toggle. The schema came from the Assignment itself; you can't add or remove rows.</p>
              <div className="field">
                <label>Two papers</label>
                <div className="input">"Aker &amp; Mbiti, 2010", "Olu, 2023"</div>
              </div>
              <div className="field">
                <label>One objection</label>
                <div className="input large">Your sample frame skips traders who only use rotating credit, who I'd argue are the most informative case…</div>
              </div>
              <div className="field">
                <label>Preference</label>
                <div className="input placeholder">Async, two-hour blocks</div>
              </div>
              <div className="submit">
                <span>READY · sign with wallet</span>
                <button className="btn btn-pri btn-sm">Sign + file <Ico name="arrow" size={13}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V3Table() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot" />The network, unfiltered</span>
          <h2>Every Assignment, <em>open right now.</em></h2>
          <p className="lede">No editorial. No "featured." Sort by recency, by open slots, by commitment volume. Read what people are working on; commit if their work resonates.</p>
        </div>
        <div className="v3-table">
          <div className="row hd">
            <span>ID</span>
            <span>Assignment</span>
            <span>Author</span>
            <span>Commitments</span>
            <span>Posted</span>
            <span></span>
          </div>
          {A3.map((a) => (
            <div className="row" key={a.id}>
              <span className="id-cell">{a.id}</span>
              <div className="ttl">{a.title}<small>{a.tags.join(" · ")}</small></div>
              <div className="who">
                <span className="avatar sm" style={{ background: a.author.hue }}>{a.author.name[0]}</span>
                <span>{a.author.name.split(" ")[0]} {a.author.name.split(" ")[1][0]}.<small>{a.author.where.split(" ")[0].replace(",","")}</small></span>
              </div>
              <span className="stat"><b>{a.commitments}</b> · {a.open} open</span>
              <span className="when">{a.posted}</span>
              <button className="go"><Ico name="arrow" size={13}/></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function V3Cred() {
  return (
    <section>
      <div className="container">
        <div className="s-head">
          <span className="label"><span className="dot"/>The Connection</span>
          <h2>The credential, <em>in fields.</em></h2>
          <p className="lede">An accepted Commitment mints a Connection — a small token that lives in your wallet and travels to other apps that read it.</p>
        </div>
        <div className="v3-cred">
          <div className="left">
            <CredToken a={P3[1]} b={P3[4]} id="cred_a1f9-3" />
          </div>
          <div className="right">
            <div className="row">
              <span className="key">ASSET</span>
              <span className="val"><b>cred_a1f9-3</b> · Connection NFT, soulbound to wallet</span>
            </div>
            <div className="row">
              <span className="key">PAIR</span>
              <span className="val"><b>Tomás Ribeiro</b> &amp; <b>Hannah Lindqvist</b></span>
            </div>
            <div className="row">
              <span className="key">ON</span>
              <span className="val"><em>{A3[4].title}</em></span>
            </div>
            <div className="row">
              <span className="key">UNLOCKS</span>
              <span className="val">private companion doc · direct thread · cite-by-permission · standing invitation back</span>
            </div>
            <div className="row">
              <span className="key">REVOKABLE</span>
              <span className="val">No. The work happened.</span>
            </div>
            <div className="row">
              <span className="key">PORTABLE</span>
              <span className="val">Yes. Other apps that read Cardano credentials see "connected to Hannah on wwm-005."</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V3CTA() {
  return (
    <section className="deep">
      <div className="container" style={{ textAlign: "center", display: "grid", gap: 32, justifyItems: "center" }}>
        <span className="label cream"><span className="dot"/>open spec · open feed · open chain</span>
        <h2 style={{ font: "400 clamp(2.5rem, 5vw, 4.5rem)/1.05 var(--serif)", margin: 0, color: "var(--on-deep)", letterSpacing: "-0.02em", maxWidth: "20ch", textWrap: "balance" }}>
          Broadcast what you're <em style={{ color: "var(--signal-soft)", fontStyle: "italic" }}>actually</em> working on.
        </h2>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-cream">Post an Assignment <Ico name="arrow" size={14}/></button>
          <button className="btn btn-cream-out">Read the spec</button>
        </div>
      </div>
    </section>
  );
}

function V3() {
  return (
    <div className="v3">
      <header><nav className="nav">
        <div className="nav-logo"><WwmMark size={24}/> Working with Me</div>
        <div className="nav-links">
          <a href="#">Network</a>
          <a href="#">For authors</a>
          <a href="#">Spec</a>
          <button className="btn btn-out btn-sm">Connect wallet</button>
        </div>
      </nav></header>
      <V3Hero />
      <V3Anatomy />
      <V3Table />
      <V3Cred />
      <FaqBlock />
      <V3CTA />
      <SiteFoot />
    </div>
  );
}
window.V3 = V3;
