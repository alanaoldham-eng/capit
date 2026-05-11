export interface IpfsUploadResult {
  uri: string;
  gatewayUrl: string;
  cid: string;
}

export async function uploadJsonToIpfs(name: string, payload: unknown): Promise<IpfsUploadResult> {
  const jwt = process.env.IPFS_PINNING_JWT;
  if (!jwt) {
    const cid = `local-${Buffer.from(name).toString("hex").slice(0, 24)}`;
    return { uri: `ipfs://${cid}`, gatewayUrl: `https://ipfs.io/ipfs/${cid}`, cid };
  }

  const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
    body: JSON.stringify({ pinataContent: payload, pinataMetadata: { name } })
  });
  const data = await response.json() as { IpfsHash: string };
  return { uri: `ipfs://${data.IpfsHash}`, gatewayUrl: `https://ipfs.io/ipfs/${data.IpfsHash}`, cid: data.IpfsHash };
}
