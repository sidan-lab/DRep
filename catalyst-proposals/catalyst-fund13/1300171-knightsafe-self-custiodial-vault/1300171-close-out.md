# Cardano Fund 13 Close-out Report

## List of Challenge KPIs and How the Project Addressed Them

### 1. Pricing Component  
One of the main challenges was ensuring that the pricing mechanism for token minting and transactions was secure, transparent, and efficient. The team leveraged secure algorithms and thorough testing in the proof-of-concept phase to ensure the integrity of the token pricing.

### 2. Token Minting Accuracy  
Another challenge was ensuring that tokens were minted securely and accurately in the system. The implementation of the Aiken Validator script ensured that token minting was accurate and tamper-resistant. Continuous security audits and testing were conducted to ensure that the minted tokens adhered to the correct specifications.

## Key Achievements (In Particular Around Collaboration and Engagement)

### 1. Leveraged Previous Experience  
The team successfully leveraged prior experience from designing DeFi trading vaults on other blockchains (particularly in Ethereum and Arbitrum) to develop a similar solution for Cardano, ensuring a faster and more effective launch.

### 2. Proof of Concept Success  
The project reached a major milestone by completing the proof of concept stage. This achievement marked the successful validation of the core functionality and showcased the potential of the product.

---

**Project Name**: SIDAN | KnightSafe - Self-custodial Vault for DeFi Trading  
**Project URL**: [https://projectcatalyst.io/funds/13/cardano-use-cases-concept/sidan-orknightsafe-self-custodial-vault-for-defi-trading](https://projectcatalyst.io/funds/13/cardano-use-cases-concept/sidan-orknightsafe-self-custodial-vault-for-defi-trading)  
**Project Number**: 1300171  
**Name of Project Manager**: KnightSafe  
**Date Project Started**: February 2025  
**Date Project Completed**: June 2025

## Project Summary

This session provides an overview of the SIDAN | KnightSafe - Self-custodial Vault for DeFi Trading (“Cardano Vault Project”), detailing the development process, the functionality of each component, and the user experience. It includes:

- An overview of the project components (Aiken Validator, Frontend, Backend)
- Step-by-step instructions for starting the project
- Detailed descriptions of the deposit and withdrawal processes

The Self-custodial Vault for DeFi Trading project represents a significant achievement in the development of a secure and efficient platform for managing digital assets on the Cardano blockchain. Throughout this project, we have successfully designed and implemented three core components: the Aiken Validator, Frontend, and Backend. Each of these components plays a crucial role in facilitating user interactions, ensuring transaction integrity, and providing a seamless experience for managing deposits and withdrawals.

### 1. Development of the Aiken Validator  
We created a robust validator script that accurately maintains UTxO (Unspent Transaction Output) spending and minting. This ensures that users can confidently engage with the platform, knowing their transactions are secure and well-managed.

### 2. User-Friendly Frontend  
The Frontend was designed with user experience in mind, allowing users to easily deposit funds and request withdrawals. By streamlining these processes, we have made it accessible for users of all experience levels to interact with the Cardano blockchain.

### 3. Efficient Backend Operations  
The Backend component automates critical functions, such as processing user requests and managing token minting and burning through cron jobs. This automation not only enhances efficiency but also reduces the potential for human error, ensuring a reliable service.

### 4. Integration with Decentralized Exchanges (DEX)  
We successfully integrated the vault with DEX. This integration allows for effective liquidity management and trading, providing users with additional opportunities to grow their assets.

## User Capabilities

With the completion of the Cardano Vault Project, users can now:

### 1. Deposit ADA  
Users can easily deposit ADA into the vault, creating a secure environment for their assets while receiving shares tokens in return.

### 2. Withdraw Assets  
Users can initiate withdrawal requests to convert their shares tokens back into ADA, ensuring they have access to their funds when needed.

### 3. Engage with DEX  
Users benefit from the vault's interaction with DEX, allowing them to trade and manage their assets effectively.

## Components Overview

The Cardano Vault Project consists of three main components: the Aiken Validator, Frontend, and Backend. This report summarizes the development and functionality of each part of the program.

### Components

#### 1. Aiken Validator  
The Aiken Validator is responsible for maintaining the UTxO spend and minting tokens based on user interactions. The validator script ensures that transactions are processed accurately and securely, allowing users to mint new tokens or spend existing ones.

#### 2. Frontend  
The Frontend component serves as the user interface for the Cardano Vault Project. It handles user requests for depositing funds and withdrawing tokens. The Frontend is designed to provide a seamless experience for users, ensuring that their requests are processed efficiently and effectively.

#### 3. Backend  
The Backend component processes requests received from the Frontend. It creates cron jobs to manage the minting and burning of tokens for users. This automation ensures that token transactions occur at scheduled intervals, maintaining the integrity and availability of the token supply.

## Steps to Start the Cardano Vault Project

This document outlines the steps required to set up and run the Cardano Vault Project, including the Validator, Frontend, and Backend components.

### 1. Compile the Validator Script to Plutus  
a. Navigate to the `/validators` directory  
b. Update the `admin` and `keeper` fields with your own keyHash  
c. Run the following command:
```bash
aiken build
```

### 2. Start Frontend Project  
a. Clone the `plutus.json` file to `frontend/src/constants/`  
b. Navigate to `/frontend`:
```bash
cd frontend
```
c. Install packages:
```bash
npm install
```
d. Create `.env` file and add:
```env
VITE_BLOCKFROST_PROJECT_ID=<your_blockfrost_project_id>
```
e. Start the frontend:
```bash
npm run dev
```

### 3. Start Backend Project  
a. Navigate to `/backend`:
```bash
cd backend
```
b. Install packages:
```bash
npm install
```
c. Run the local database using Docker:
```bash
docker-compose run
```
d. Push the schema:
```bash
npm run dh:push
```
e. Create `.env` file and add:
```env
DATABASE_URL=<your_database_url>
MNEMONIC=<your_keeper_executor_key>
BLOCKFROST_PROJECT_ID=<your_blockfrost_project_id>
```
f. Start backend:
```bash
npm run dev
```

### 4. Start the Keeper Manually  
To trigger orders, run:

#### i. For deposits:
```bash
bun run backend/src/scripts/settlement.ts deposit
```

#### ii. For withdrawals:
```bash
bun run backend/src/scripts/settlement.ts withdraw
```

## Users Flow Demo on Video

### Deposit & Vault Interaction (`deposit.mp4`)
1. User sends ADA to vault (0:00 - 0:29)  
2. Keeper verifies transaction and mints tokens (0:30 - 1:20)  
3. Vault sends share token to user (1:21 - 1:24)  
4. Vault interacts with SundaeSwap (1:25 - 2:00)

### Withdrawal (`withdrawal.mp4`)
5. User sends shares to vault (0:00 - 0:21)  
6. Keeper verifies and burns token (0:22 - 0:26)  
7. Vault sends ADA back to user (0:28 - 0:41)

## Cardano Validator Scripts

- **Token mint/burn script**  
  https://cardanoscan.io/address/addr1w9dk9dy3r5qj4eu9rzmmpk8whgsda8uq862fguvqa2mzp7g5mlss5  
  Transaction:  
  https://cardanoscan.io/transaction/0e60dec6f8c9430141329c67a03a27645ebb570496a1f2da3b10d440aba40a2c

- **Shares token address**  
  https://cardanoscan.io/token/8bed55e0404fdceac66ecafd0828bde2ee4a183ebef085a73ec015617661756c74546573742d313306a756e2d31373030

- **Token redeem pool script**  
  https://cardanoscan.io/address/addr1wx6nfagzld33465lyrypl4xgn5fgxqupacer5alvm3yp3hstzn098  
  Transaction:  
  https://cardanoscan.io/transaction/d3da3ec7951e9ed16192a5eeb1116f18fddf5d5efaf707c7d20e8f95454ffe25

## Key Learnings

**Cross-Chain Experience**  
The team utilized DeFi vault experience from Ethereum and Arbitrum to streamline development on Cardano and successfully validate the concept in a new ecosystem.

## Next Steps

With the proof of concept complete, the next step is to move toward broader real-world usage. Key goals include:

- Launching to more users
- Integrating additional DEXs on Cardano
- Improving UX and interface polish
- Continuous auditing and smart contract security

## Final Thoughts

This project bridges Cardano and DeFi by delivering a working, secure self-custodial vault product. With user-tested deposit and withdrawal flows, on-chain validation, and DEX integration, the foundation is in place for expanding real-world utility in the ecosystem.
