|Project ID|1200097|
|-----------|-------------|
|Link|[Open full project](https://projectcatalyst.io/funds/12/f12-cardano-use-cases-mvp/deltadefi-pioneering-high-frequency-trading-on-cardano)|
|Milestone|[Milestone 4](https://milestones.projectcatalyst.io/projects/1200097/milestones/4)|
|Challenge|F12: Cardano Use Cases: MVP|
|Milestone Budget|ADA 45,000.00|
|Delivered|	January 23, 2025|

# Milestone Report

Regarding feedback from catalyst team on milestone 2, I believe it might be a mistake by catalyst team reviewer to request for same evidence again during milestone 4 review. The comments are mostly same wordings I have seen in milestone 2 review in which I have already supplemented the missing evidence and received approval on milestone 2 proof of achievement reviews. Please let me know if there is any misunderstanding here. Thanks a lot!

Regarding feedback from catalyst team on milestone 4, please find below responses::

Regarding the documentation of the API related to overview of the API, endpoint description, usage instructions, and examples, I have revised the swagger.yaml file to supplement all these information. The revised swagger.yaml file includes below information for each api function:

- API path e.g. /accounts/signin
- API method e.g. post
- Summary (A short sentence summarising the api objective)
- Description (A short paragraph illustrating the api usage instructions)
- Parameter (if the api requires request parameter, the swagger doc illustrates the data type and provide an example of it)
- responses (The swagger doc illustrate the example response of successful and unsuccessful api request)
- Schema of the parameters are shown in the swagger doc as well

Regarding the documentation of the public repository, I have revised the readme.file to reflect the overview of the repo. It should be sufficient enough for public users to understand the repo structure and navigate the repo efficiently to utilize the api functions.

Please find the revised materials in:
- swagger.yaml file: https://github.com/deltadefi-protocol/deltadefi-backend/blob/master/internal/api/swagger.yaml
- readme file: https://github.com/deltadefi-protocol/deltadefi-backend/tree/master
