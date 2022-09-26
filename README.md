# PR Token & Smart-contracts sur la blockchain Ethereum

Porté par Quentin Dewaghe, Joris Placette , Clément Girard 

[Trello](https://trello.com/b/vxREy2ZX/pr-ethereum)

Notre projet consiste à créer un **Token ERC20** ainsi qu'un **smart contract** de lotterie sur ce token, le tout sur un reseau de test de la **blockchain** **Ethereum**.

## Notions préalables

### Blockchain

Une blockchain, ou chaîne de blocs est une technologie de stockage et de transmission d'informations sans organe de contrôle. Techniquement, il s'agit d'une base de données distribuée dont les informations envoyées par les utilisateurs et les liens internes à la base sont vérifiés et groupés à intervalles de temps réguliers en blocs, formant ainsi une chaîne. L'ensemble est sécurisé par cryptographie. Par extension, une chaîne de blocs est une base de données distribuée qui gère une liste d'enregistrements protégés contre la falsification ou la modification par les nœuds de stockage ; c'est donc un registre distribué et sécurisé de toutes les transactions effectuées depuis le démarrage du système réparti.

[En savoir plus :fr: (source)](https://fr.wikipedia.org/wiki/Blockchain) 

### Le projet Ethereum

Ethereum est une blockchain décentralisée et open-source dotée de fonctionnalités de contrats intelligents. L'éther (ETH ou Ξ) est la crypto-monnaie native de la plateforme. Après le Bitcoin, c'est la plus grande crypto-monnaie en termes de capitalisation boursière. Ethereum est la blockchain la plus activement utilisée.

**La plateforme permet aux développeurs d'y déployer des applications décentralisées permanentes et immuables, avec lesquelles les utilisateurs peuvent interagir**. Les applications financières décentralisées (DeFi) fournissent un large éventail de services financiers sans avoir recours aux intermédiaires financiers habituels 
En outre, **de nombreuses autres crypto-monnaies fonctionnent en tant que jetons ERC-20** au sommet de la blockchain Ethereum et ont utilisé la plateforme pour des offres initiales de pièces.

Ethereum continue d'évoluer, et a commencé à mettre en œuvre une série de mises à niveau appelée Ethereum 2.0, qui comprend une transition vers la preuve d'enjeu et vise à augmenter le débit des transactions en utilisant le sharding.

[En savoir plus :uk: (source)](https://en.wikipedia.org/wiki/Ethereum)

### Les Contrats intelligents

Un "contrat intelligent" (smart contract) est un programme qui s'exécute sur la blockchain Ethereum. C'est une collection de code (ses fonctions) et de données (son état) qui réside à une adresse spécifique sur la blockchain Ethereum.

Les contrats intelligents sont un type de compte Ethereum. Cela signifie qu'ils ont un solde et qu'ils peuvent envoyer des transactions sur le réseau. Cependant, ils ne sont pas contrôlés par un utilisateur, mais sont déployés sur le réseau et fonctionnent comme prévu. Les comptes d'utilisateurs peuvent alors interagir avec un contrat intelligent en soumettant des transactions qui exécutent une fonction définie sur le contrat intelligent. Les contrats intelligents peuvent définir des règles, comme un contrat ordinaire, et les appliquer automatiquement via le code.

[En savoir plus :uk: (source)](https://ethereum.org/en/developers/docs/smart-contracts/) 
 
### Tokens ERC20

ERC20 est une norme technique utilisée pour les smart contracts sur la blockchain Ethereum pour la mise en œuvre de jetons. La grande majorité des jetons émis sur la blockchain Ethereum sont conformes à la norme ERC20.

[En savoir plus :uk:](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

## Objectifs de la PR

La blockchain est une technologie d'avenir, avec un fonctionnement purement révolutionnaire, faisant table-rase des paradigmes de l'informatique que de l'économie traditionnelle.
Le but de ce projet de PR est pour nous d'apprendre par la pratique à travailler avec la blockchain [la plus utilisée](https://cryptofees.info/).

## Livrables de la PR

### Rapport de travail 
- Présentation des caractéristiques du Token créé, le cas échéant.
- Présentation des autres livrables. 
- Environ 20 pages 

### Implémenter un nouveau token échangeable sur la blockchain Ethereum (testnet)
- Répondant aux standards ERC20


### Implémenter un smart-contract de loterie
- L'objectif est de créer un jeu de chance avec une probabilité de gagner que l'on peut prouver via la blockchain (impossible pour la maison de tricher)
- Quand la loterie aura gagné N tokens, elle en déposera une partie sur une adresse prédéterminée à la création du contrat
- La loterie doit refuser le pari si elle ne peut pas couvrir les gains potentiels du joueur
- La loterie doit gagner de l'argent à terme
- Volatilité adoptive (le joueur peut adapter le risque)
- Les frais de transactions encourus sont réglés en ETH par le joueur.


### Créer une application web3 pour interagir avec les contrats et la loterie
- Utilisation de web3.js
    - https://web3js.readthedocs.io/en/v1.3.4/
- Permettre d'interagir avec la loterie
    - Voir les résultats en temps réel
    - parier des tokens
- Interactions avec la blockchain
    - voir les transferts du token
    - voir l'historique des résultats de la loterie
    - voir ses gains/pertes (historique + interaction avec metamask)



## Proposition sujet PR 

La blockchain est une technologie révolutionnaire, faisant table-rase des paradigmes de l'informatique que de l'économie traditionnelle.
L'objet de cette PR est d'apprendre par la pratique à travailler avec la blockchain Ethereum. La première étape pratique sera de spécifier et d'implémenter, au travers de smart contracts (programmes qui s’exécutent sur la blockchain Ethereum) un token ERC-20 sur un réseau de test d'Ethereum. Il s'agira ensuite d'implémenter des smart contracts qui interagiront avec ce token, parmi lesquels une loterie. Une interface web déveoppée à l'aide de web3.js permettant aux internautes d'interagir avec le smart contract de loterie sera également à développer.
Un rapport accompagnera ces livrables, il devra décrire le principe de fonctionnement du token et des livrables de ce projet. Les impacts environnemental et sociétal de la solution proposée seront à évaluer et mettre en perspective.
Plus d'informations ici : https://hackmd.io/FOFeyENgTk6m0V-rdOwkrA
