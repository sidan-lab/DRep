|Project ID|1200202|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-open-developers/sidan-or-meshjs-cardano-service-layer-framework-for-dapps)|
|Milestone|[Milestone 4](https://milestones.projectcatalyst.io/projects/1200202/milestones/4)
|Challenge|	F12: Cardano Open: Developerst|
|Milestone Budget|ADA 10,000.00|
|Milestone Delivered|	May 29, 2025|

# Milestone Report

	
During our research and development, we have identified that the instance will stop responding to requests after a certain period. The reason is due to the fact that Yaci was designed to be a lightweight devnet and not for persistent. Yaci DevKit's default indexer uses an embedded H2 database. In order to achieve persistence, Yaci was upgraded to support PostgreSQL. See https://github.com/bloxbean/yaci-devkit/releases/tag/v0.10.0-preview2.

Edit config/application.properties and uncomment the following properties to set PostgreSQL database details:
- yaci.store.db.url=jdbc:postgresql://<dbhost>:<dbport>/<dbname>?currentSchema=<schema_name>
- yaci.store.db.username=user
- yaci.store.db.password=password

Documentation for starting the network, building transaction and submitting transaction can be found on Mesh website:
- https://meshjs.dev/yaci/getting-started, see "Support external PostgreSQL database for indexer"
- https://meshjs.dev/yaci/transactions

Full link:
- https://hackmd.io/@jingles/SkWOYtTZxe 
