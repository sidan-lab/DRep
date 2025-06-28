|Project ID|1200202|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-open-developers/sidan-or-meshjs-cardano-service-layer-framework-for-dapps)|
|Milestone|[Milestone 3](https://milestones.projectcatalyst.io/projects/1200202/milestones/3)
|Challenge|	F12: Cardano Open: Developerst|
|Milestone Budget|ADA 30,000.00|
|Milestone Delivered|		May 23, 2025 |

# Milestone Report
Cardano Service Layer Framework for DApps Milestone 3: https://hackmd.io/@jingles/HJgZKtTZlg

---

Cardano Service Layer Framework for DApps
Milestone 3: Customized Protocol Parameters
Hey there Milestone reviewers, voters and really anyone who is following the progress of this proposal. Here we are, reporting on the successful completion of Milestone 3. We got into quite some delay, but, here we are catching up.

- https://milestones.projectcatalyst.io/projects/1200202/milestones/3

Objective: To introduce customized protocol parameters feature with the parallel Cardano blockchain

### Acceptance criteria
Research and develop the approach to exposing altering protocol parameters at the time of starting the parallel Cardano network (e.g. fees and stakepools keys rotation)
Upgrade MeshJS to support customized protocol parameters

### Evidence of milestone completion
A markdown file in the public Github repository, stating the exact flow of starting the network, building transaction and submitting transaction with customized protocol parameters.
A published meshsdk/core node module public visitable in on npm registry with documentation on how to interact with customized protocol parameter

### Report
And here the successful completed developments of the milestone deliverables:

MeshJS has been updated to support customized protocol parameters, it can be easily done by doing:

const provider = new YaciProvider("YACI_URL");
const pp = await provider.fetchProtocolParameters();

const txBuilder = new MeshTxBuilder({
  fetcher: provider,
  params: pp,
});


Here we use the YaciProvider to query Yaci instance, and get the protocol parameters, then we pass it to the MeshTxBuilder. See docs: https://meshjs.dev/apis/txbuilder/basics#customProtocolParameter

The flow to starting network and building transaction with customized protocol parameters is as follows:

1. start a devnet with zero fees, run the following command from yaci-cli: yaci-cli:>create-node -o --genesis-profile zero_fee --start
2. start a devnet with 30 slots per epoch, run the following command from yaci-cli: yaci-cli:>create-node -o -e 30 --start
3. if you want to perform more configuration to the devnet, go to config/node.properties and make changes to the properties file, then run the following command from yaci-cli: yaci-cli:>create-node -o --start

These steps are also documented and described on our Mesh website at: https://meshjs.dev/yaci/getting-started#start

You can find more detailed track records of the development at the respective github files at: https://github.com/MeshJS/mesh/tree/main/apps/playground/src/pages/yaci

All code is fully open source, you can find the respective open source license at: https://github.com/MeshJS/mesh?tab=Apache-2.0-1-ov-file#readme

And thats it for this Milestone. We are also finishing Milestone 4 which we will submit once Milestone 3 has been reviewed and accepted.
