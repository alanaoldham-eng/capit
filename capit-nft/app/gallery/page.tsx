const collections = [
  { name: "Registry NFTs", role: "Public environmental receipts", quantity: "All wells eventually", visual: "GIS receipt cards" },
  { name: "Premium NFTs", role: "Curated storytelling", quantity: "Selected wells only", visual: "Cinematic industrial Americana" },
  { name: "Genesis NFTs", role: "Launch community artifacts", quantity: "Small scarce set", visual: "Founder-grade archival collectibles" }
];

export default function GalleryPage() {
  return (
    <main className="page">
      <nav className="nav"><a className="brand" href="/">CAPIT GALLERY</a><div className="links"><a href="/explorer">Explorer</a><a href="/admin">Admin</a></div></nav>
      <section className="hero"><div className="kicker">Collectible layer</div><h1>Not every well is a collectible. The best stories become art.</h1><p>Premium and Genesis collections provide narrative, rarity, and culture without changing CAPIT's environmental counter invariant.</p></section>
      <section className="grid">{collections.map((collection) => <article className="card" key={collection.name}><span className="badge">{collection.quantity}</span><h2>{collection.name}</h2><p>{collection.role}</p><p>{collection.visual}</p></article>)}</section>
    </main>
  );
}
