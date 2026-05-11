// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ICAPITToken {
    function mint(address to, uint256 amount) external;
}

interface IPluggedWellRegistry {
    function recordWellProof(bytes32 apiNumberHash, bytes32 wellIdHash, bytes32 proofHash, string calldata metadataURI) external;
}

interface ICAPITNft {
    function safeMint(address to, string calldata tokenURI) external returns (uint256);
}

contract OracleMinter {
    enum NftTier { RegistryOnly, PremiumCandidate, GenesisCandidate }

    address public immutable safe;
    ICAPITToken public immutable capitToken;
    IPluggedWellRegistry public immutable registry;
    ICAPITNft public immutable registryNft;
    ICAPITNft public immutable premiumNft;
    ICAPITNft public immutable genesisNft;

    event VerifiedWellMinted(bytes32 indexed apiNumberHash, bytes32 indexed wellIdHash, bytes32 proofHash, NftTier nftTier, uint256 capitAmount);

    modifier onlySafe() {
        require(msg.sender == safe, "CAPIT: Safe only");
        _;
    }

    constructor(address safe_, address capitToken_, address registry_, address registryNft_, address premiumNft_, address genesisNft_) {
        safe = safe_;
        capitToken = ICAPITToken(capitToken_);
        registry = IPluggedWellRegistry(registry_);
        registryNft = ICAPITNft(registryNft_);
        premiumNft = ICAPITNft(premiumNft_);
        genesisNft = ICAPITNft(genesisNft_);
    }

    function mintVerifiedWell(address recipient, bytes32 apiNumberHash, bytes32 wellIdHash, bytes32 proofHash, string calldata metadataURI, NftTier nftTier) external onlySafe {
        registry.recordWellProof(apiNumberHash, wellIdHash, proofHash, metadataURI);
        capitToken.mint(recipient, 1 ether);

        if (nftTier == NftTier.RegistryOnly) {
            registryNft.safeMint(recipient, metadataURI);
        } else if (nftTier == NftTier.PremiumCandidate) {
            registryNft.safeMint(recipient, metadataURI);
            premiumNft.safeMint(recipient, metadataURI);
        } else if (nftTier == NftTier.GenesisCandidate) {
            registryNft.safeMint(recipient, metadataURI);
            genesisNft.safeMint(recipient, metadataURI);
        }

        emit VerifiedWellMinted(apiNumberHash, wellIdHash, proofHash, nftTier, 1 ether);
    }
}
