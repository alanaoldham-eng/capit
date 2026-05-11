// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract PluggedWellRegistry is AccessControl {
    bytes32 public constant ORACLE_MINTER_ROLE = keccak256("ORACLE_MINTER_ROLE");

    struct WellProof {
        bytes32 apiNumberHash;
        bytes32 wellIdHash;
        bytes32 proofHash;
        string metadataURI;
        uint256 recordedAt;
    }

    mapping(bytes32 => WellProof) public wellProofsByApiHash;
    mapping(bytes32 => bool) public mintedApiHashes;

    event WellProofRecorded(bytes32 indexed apiNumberHash, bytes32 indexed wellIdHash, bytes32 proofHash, string metadataURI);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function recordWellProof(bytes32 apiNumberHash, bytes32 wellIdHash, bytes32 proofHash, string calldata metadataURI) external onlyRole(ORACLE_MINTER_ROLE) {
        require(!mintedApiHashes[apiNumberHash], "CAPIT: duplicate well");
        mintedApiHashes[apiNumberHash] = true;
        wellProofsByApiHash[apiNumberHash] = WellProof(apiNumberHash, wellIdHash, proofHash, metadataURI, block.timestamp);
        emit WellProofRecorded(apiNumberHash, wellIdHash, proofHash, metadataURI);
    }
}
