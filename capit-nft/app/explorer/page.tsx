const wells = [
  { api: "4200331234", state: "TX", county: "Andrews", tier: "premium_candidate", methane: 725, status: "dry_run_passed" },
  { api: "3501729988", state: "OK", county: "Canadian", tier: "registry_only", methane: 180, status: "validated" },
  { api: "0300521001", state: "AK", county: "North Slope", tier: "genesis_candidate", methane: 990, status: "safe_prepared" }
];

export default function ExplorerPage() {
  return (
    <main className="page">
      <nav className="nav"><a className="brand" href="/">CAPIT REGISTRY</a><div className="links"><a href="/admin">Admin</a><a href="/gallery">Gallery</a></div></nav>
      <section className="hero">
        <div className="kicker">Public explorer</div>
        <h1>Search verified plugged wells.</h1>
        <p>Filter by API number, state, NFT tier, methane reduction estimate, and plug date. Registry data is public infrastructure, not a carbon-credit marketplace.</p>
        <div className="grid"><input placeholder="API number" /><select><option>All states</option><option>TX</option><option>OK</option><option>AK</option></select><select><option>All tiers</option><option>registry_only</option><option>premium_candidate</option><option>genesis_candidate</option></select></div>
      </section>
      <section className="card"><table className="table"><thead><tr><th>API</th><th>State</th><th>County</th><th>Tier</th><th>Methane tCO2e</th><th>Status</th></tr></thead><tbody>{wells.map((well) => <tr key={well.api}><td>{well.api}</td><td>{well.state}</td><td>{well.county}</td><td>{well.tier}</td><td>{well.methane}</td><td>{well.status}</td></tr>)}</tbody></table></section>
    </main>
  );
}
