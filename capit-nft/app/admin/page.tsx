const workflow = ["Upload Batch", "Validate Data", "Generate Hashes", "Determine NFT Tier", "Generate Metadata", "Generate/Upload Art", "Upload to IPFS", "Dry Run on Base Sepolia", "Prepare Safe Transaction", "Execute Mainnet Mint", "Export Receipt"];

export default function AdminDashboard() {
  return (
    <main className="page">
      <nav className="nav"><a className="brand" href="/">CAPIT ADMIN</a><div className="links"><a href="/explorer">Public Explorer</a><a href="/gallery">Gallery</a></div></nav>
      <section className="hero">
        <div className="kicker">Charles operator console</div>
        <h1>Monthly plugged-well minting workflow.</h1>
        <p>Upload the approved spreadsheet, validate duplicate prevention, generate hashes, review NFT tier candidates, dry-run on Base Sepolia, and prepare Safe-only production execution.</p>
        <div className="grid">
          <div className="card"><h2>Batch upload</h2><input type="file" accept=".csv,.xlsx" /><p>Required columns match <code>sample-data/sample-well-batch.csv</code>.</p><button className="button">Validate Batch</button></div>
          <div className="card"><h2>Tier review</h2><select defaultValue="premium_candidate"><option>registry_only</option><option>premium_candidate</option><option>genesis_candidate</option></select><p>Admins can override automatic tier recommendations before metadata is pinned.</p></div>
          <div className="card"><h2>Safe execution</h2><p className="badge">Production requires Safe multisig</p><p>No private keys are exposed in the frontend; this dashboard prepares calldata only.</p></div>
        </div>
      </section>
      <section className="grid">
        {workflow.map((step, index) => <div className="card" key={step}><span className="badge">Step {index + 1}</span><h2>{step}</h2><p>Immutable audit event recorded when this stage completes.</p></div>)}
      </section>
    </main>
  );
}
