export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <div className="brand">CAPIT NFT OPS</div>
        <div className="links"><a href="/admin">Admin</a><a href="/explorer">Explorer</a><a href="/gallery">Gallery</a></div>
      </nav>
      <section className="hero">
        <div className="kicker">America's plugged well archive onchain</div>
        <h1>Environmental infrastructure meets Base-chain culture.</h1>
        <p>CAPIT mints exactly one CAPIT token per verified plugged or capped U.S. oil and gas well, then layers registry receipts, curated Premium NFTs, and scarce Genesis launch artifacts on top.</p>
        <div className="grid">
          <div className="card"><div className="stat">1:1</div><p>One verified plugged well permits one CAPIT token mint. No other ratio is valid.</p></div>
          <div className="card"><div className="stat">~1.8M</div><p>Estimated eventual CAPIT supply aligned to verified plugged wells, not collectible scarcity.</p></div>
          <div className="card"><div className="stat">3</div><p>Registry, Premium, and Genesis NFT layers separate audit infrastructure from collectible storytelling.</p></div>
        </div>
      </section>
    </main>
  );
}
