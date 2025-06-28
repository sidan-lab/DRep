# Name of project:  
Rust library for easy off-chain transaction building

## Project URL on IdeaScale/Fund:  
https://cardano.ideascale.com/c/cardano/idea/112172

## Your Project Number:  
1100250

## Name of project manager:  
Kinson Cheung

## Date project started:  
1 April 2024

## Date project completed:  
1 Aug 2024

---

## List of challenge KPIs and how the project addressed them  

As outlined in the Campaign Brief,  
Cardano Open: Developers (technical track) category aims to support developers and engineers to contribute to or develop open source technology centered around enabling and improving the Cardano developer experience.  
The goal of this category is to create developer-friendly tooling and approaches that streamline an integrated development environment, help to create code more efficiently and provide an ease of use for developers.

### Challenge:  
Cardano lacks libraries for easy off-chain transaction building in Rust, for efficient Cardano application backend.

### How to address:  
Implement a cardano-cli like wrapper on cardano-serialization-lib (equivalent on MeshJS’s lower level APIs), supporting serious DApps’ backend on rust codebase.  
To implement the same APIs as the Mesh’s lower level APIs, but on natively Rust library of the cardano-serialization-lib.  
The planned API documentation could be referred to https://meshjs.dev/apis/txbuilder.

---

## List of project KPIs and how the project addressed them  

The project KPIs were focused on delivering the following:  
- Develop all the serialization logic as planned  
- Host the documentation online with public access  
- Produce content for examples  
  - Simple transaction (sending ADA and value)  
  - Easy smart contract example (unlocking value from single validator / minting single policy)  
  - Complex smart contract transaction example (multiple unlocking with multiple minting, with signer & time check)  

As per the Project’s PoAs, all of the above deliverables were met alongside other milestone items described in the relevant PoAs.

---

## Key achievements (in particular around collaboration and engagement)

This is the summary of key achievements:  
- Featuring whisky course in andamio - https://www.andamio.io/courses  
- Finalised course materials - https://www.andamio.io/course/whisky  
- Github repository - https://github.com/sidan-lab/whisky  
- Inline documentation - https://sidan-lab.github.io/whisky/whisky/  
- Hosted gitbook documentation - https://whisky.sidan.io/

---

## Key learnings  

- Well plan on development time and area, ensure that there is sufficient amount of time to R&D and develop.  
- List all important notes and guidance to let developer to follow.  
- Provide examples for developers to follow.

---

## Next steps for the product or service developed  

- Maintain of Github and Gitbook documentation  
- Maintain course material on Andamio

---

## Final thoughts/comments  

Packages such as Mesh & Lucid have proven this layer of logic abstraction useful for Cardano Dapp development. It also lowers the entrance barriers for seasoned non-Cardano-native software engineers in Cardano development.  
With such abstraction logic, it could save tens of thousands in development cost for a single production grade Dapp off-chain. Thus, value for money is justified when there are a few projects building on the package.  
There are a bunch of Cardano infrastructure tools built on Rust. The package proposed would be able to natively integrate with production grade Dapps.

---

## Links to other relevant project sources or documents  

- Close-out video: https://youtu.be/T7EJcxV8Xew  
- Demo video: https://youtu.be/_8xx-Lc3yQo?feature=shared  
- Full video: https://youtu.be/GSZiLGe5Sa8?si=Xpd4GpcZD9QuTHip
