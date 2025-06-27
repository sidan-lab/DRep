|Project ID|1100022|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/11/cardano-open-developers/aiken-open-source-smart-contract-library-by-meshjs-and-trustlevel)|
|Milestone|[Milestone 2](https://milestones.projectcatalyst.io/projects/1100022/milestones/2)
|Challenge|F11: Cardano Open: Developers|
|Milestone Budget|ADA 33,960.00|
|Delivered|	November 1, 2024|

# Milestone Report

	
Milestone 2 includes advanced Smart Contracts, which includes NFT minting, Content ownership with each Oracle Design Patterns. Each contract includes the oracle scripts, Aiken Workspace and Tx Builder and can be found in linked Github Repository. Additional, you can find more about MeshJS and the complete documentation also on our Website www.meshjs.dev.

### Video to demonstrate the use of the library:
- https://www.dropbox.com/scl/fi/lmrpn9h6dj0g83f3c1iko/Copy-aikenlib-m2.mov?rlkey=36fy2m9ixglmv3fnc5w4ek43f&st=sfbgbys5&dl=0

### Smart Contract Description:
Content Ownership:
- Documentation: https://meshjs.dev/smart-contracts/content-ownership
- Github Repository: https://github.com/MeshJS/mesh/tree/main/packages/mesh-contract/src/content-ownership
> - Included Oracle Design Pattern:

### Setup Oracle UTXO: 
Sends the NFT to the oracle contract locking the datum, which serves as single source of truth
- Create Content Registry
- Create Ownership registry
- Get Oracle Data: Fetch the current state of the registry
- Mint User Token: Mints token so user can create the content
- Create content: Attaches the content to the registry
- Get content: Fetches content data from the registry
  
### Smart Contract NFT Minting:
- Documentation: https://meshjs.dev/smart-contracts/plutus-nft
- Github Repository: https://github.com/MeshJS/mesh/tree/main/packages/mesh-contract/src/plutus-nft
> - Included Oracle Design Pattern:
- Setup Oracle: Mint one-time minting policy to set up the oracle
- Mint Token: Mint NFT that ensures the token name is incremented by a counter
- Get Oracle Data: Fetch the current oracle data to get the current NFT index and other information
