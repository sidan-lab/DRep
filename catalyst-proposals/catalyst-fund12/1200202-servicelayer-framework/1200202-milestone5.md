|Project ID|1200202|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-open-developers/sidan-or-meshjs-cardano-service-layer-framework-for-dapps)|
|Milestone|[Milestone 5](https://milestones.projectcatalyst.io/projects/1200202/milestones/5)
|Challenge|	F12: Cardano Open: Developerst|
|Milestone Budget|ADA 10,000.00|
|Milestone Delivered|	June 10, 2025|

# Milestone Report

	
https://hackmd.io/@jingles/S19l89TZxl#Report

Yaci has been packaged and easily set up with multiple nodes.

There are three configuration files available in the docker folder:
- env - Environment variables like JAVA_OPTS
- application.properties - Contains application specific properties. (e.g; Cardano node host, port, database info, store configuration etc.)
- application-aggr.properties - Contains Aggregation application specific properties.

There are three out-of-the-box applications available in the Yaci Store repository:
- Yaci Store Utxo Indexer : Includes Utxo Store, Epoch Store, and Submit component
- Yaci Store All : Includes all stores
- Yaci Store Aggregation : Aggregates account balances

You can run out-of-the-box applications with Docker Compose. The Docker Compose YAML files for the applications are inside the docker folder in GitHub repository.

- Please clone the repository to access the Docker Compose files.
- Verify compose yaml file are pointing to the correct application image version.
  
Run Utxo Indexer application
- The Utxo Indexer application consists of the utxo store, epoch store, and submit component.
- By default, the submit endpoint is disabled. You can refer to the Enable Submit Endpoint section for instructions on how to enable it.
- docker compose -f yaci-store-utxo-indexer-monolith.yml up -d

Run Aggregation App to calculate account balances
- Aggregation App is a separate application that calculates account balances by aggregating the UTXO store data.
- docker compose -f yaci-store-aggregation-monolith.yml up -d

Defy’s application customized service layer
Our publicly accessible deployment of Defy’s application customized service layer can be found here:
- https://cloud.meshjs.dev/yaci/usage
- https://cloud.meshjs.dev/yaci/faucet

And the entire deployment flow can be found on Mesh website:
- https://meshjs.dev/yaci
  
We hope the deliverables are to your satisfaction. We are now preparing the completion of the final milestone.
