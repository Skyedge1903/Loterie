# Ethereum

Ethereum est une blockchain décentralisée et open-source dotée de fonctionnalités de contrats intelligents. L'Ether (ETH ou Ξ) est la crypto-monnaie native de la plateforme. Parmi les crypto-monnaies, l'Ether occupe la deuxième place après le Bitcoin en termes de capitalisation boursière.

Ethereum a été conçu en 2013 par le programmeur Vitalik Buterin En 2014, les travaux de développement ont commencé et ont été financés par crowdfunding, et le réseau a été mis en service le 30 juillet 2015 La plateforme permet à quiconque de déployer sur elle des **applications décentralisées permanentes et immuables** (appelées smart contract dans cette documentation), avec lesquelles les utilisateurs peuvent interagir. Les applications de finance décentralisée (DeFi) fournissent un large éventail de services financiers sans avoir recours aux intermédiaires financiers habituels tels que les courtiers, les bourses ou les banques, par exemple en permettant aux utilisateurs de crypto-monnaies d'emprunter sur leurs avoirs ou de les prêter contre des intérêts.

Ethereum permet également la création et l'échange de NFT, qui sont des jetons non interchangeables liés à des œuvres d'art numériques ou à d'autres objets du monde réel, et vendus en tant que propriété numérique unique. En outre, de nombreuses autres crypto-monnaies fonctionnent en tant que jetons ERC-20 au sommet de la blockchain Ethereum et ont utilisé la plateforme pour des offres initiales de pièces (ICO).

Ethereum, repose présentement sur la **preuve de travail** (Proof of Work) pour sécuriser l'intégrité de son fonctionnement. Cependant, Ethereum a commencé à mettre en œuvre une série de mises à niveau appelée **Ethereum 2.0**, qui comprend une transition vers la preuve d'enjeu (Proof of Stake), et vise à augmenter le débit des transactions en utilisant le sharding, c'est à dire répartir la charge de travail sur plusieurs sous-chaines. 

[Source : la page *Ethereum* sur Wikipedia](https://en.wikipedia.org/wiki/Ethereum)

## Ether/eth

L'`Ether` (ou `ETH`) est la monnaie d'Ethereum, est divisible en `wei`, $wei = eth*10^-18$. Chaque transaction sur le Ethereum a besoin d'une certaines quantité d'ether pour que la transaction soit effectuée, ce sont les frais de transactions. La demande sur Ethereum fait donc monter le prix de l'actif numérique qu'est l'ether. La capitalisation d'Ethereum `$337 047 046 115,56` à l'heure de la rédaction de ce document.

## Comptes 

Il existe **deux types de comptes** sur Ethereum : 
1. les **comptes d'utilisateurs** (également connus sous le nom de comptes à propriété externe)
2. les **contrats**.

Les deux types de comptes :
- ont un solde d'ether
- peuvent envoyer des ETH à n'importe quel compte
- peuvent appeler n'importe quelle fonction publique d'un smart contract
- créer un nouveau contrat
- sont identifiés sur la blockchain et dans l'état par leur adresse.

Les comptes d'utilisateurs sont le seul type qui peut créer des transactions. Pour qu'une transaction soit valide, elle doit être signée à l'aide de la clé privée du compte émetteur. Il s'agit d'une chaîne hexadécimale de 64 caractères qui ne doit être connue que du propriétaire du compte. L'algorithme de signature utilisé est ECDSA. 
Il est important de noter que cet algorithme permet de déduire l'adresse du signataire à partir de la signature sans connaître la clé privée.

Les contrats sont le seul type de compte qui possède un code associé (un ensemble de fonctions et de déclarations de variables) et un stockage de contrat (variables déclarées avec le mot clé `storage` du code solidity du contrat). Une fonction de contrat peut prendre des arguments et peut avoir des valeurs de retour. Dans le corps d'une fonction, en plus des déclarations de flux de contrôle, le code d'un contrat peut
- inclure des instructions pour envoyer des ETH
- lire et écrire dans son stockage
- créer un stockage temporaire (variables déclarées avec le mot clé `memory` du code solidity du contrat) qui meurt à la fin de la fonction
- effectuer des opérations arithmétiques et de hachage
- appeler ses propres fonctions
- appeler les fonctions publiques d'autres contrats
- créer de nouveaux contrats et interroger les informations sur la transaction en cours ou la blockchain.

## Ethereum Machine virtuelle (EVM)

La machine virtuelle Ethereum (EVM) est l'environnement d'exécution des transactions dans Ethereum. Il s'agit d'une pile de registres de 256 bits qui est isolée des autres fichiers et processus du nœud afin de garantir que, pour un état pré-transactionnel et une transaction donnés, chaque nœud produit le même état post-transactionnel, permettant ainsi le consensus du réseau. La définition formelle de l'EVM est spécifiée dans le Ethereum Yellow Paper. L'EVM a été implémenté en :
- C++
- C#
- Go
- Haskell
- Java
- JavaScript
- Python
- Ruby
- Rust
- Elixir
- Erlang

## Frais et Gas 

Chaque instruction éxécutée dans un contrat a un cout appelé gas, par example transferer de l'Ether d'un portefeuille à un autre a un coût de 21 000 gas au total. Chaque gas a un prix en gwei (giga-wei ou un nano-eth). Ce prix dépend de `basefee`, `basefee` augmente si le gas total utiliser dans un bloc est supérieur à 30 millions, au contraire `basefee` baisse. 

Example:
Si `basefee` est égal à 5gwei alors une transaction de 21 000 gas coûtera $5*21000*10^-9= 0.000105eth$.

En plus de basefee, il est possible d'ajouter des frais de priorité pour inciter les mineurs à inclure une transaction de façon prioritaire au cas où un grand nombre de transactions arrivent au même moment.

Chaque type d'opération pouvant être effectuée par l'EVM est codé en dur avec un certain coût de gas, qui est censé être à peu près proportionnel à la quantité de ressources (calcul et stockage) qu'un nœud doit dépenser pour effectuer cette opération. Lors de la création d'une transaction, l'expéditeur doit spécifier une limite de gas et un prix du gas. La limite de gas est la quantité maximale de gas que l'expéditeur est prêt à utiliser dans la transaction, et le prix du gas est le montant d'ETH que l'expéditeur souhaite payer au mineur par unité de gas utilisée. Plus le prix du gas est élevé, plus le mineur est incité à inclure la transaction dans son bloc, et donc plus vite la transaction sera incluse dans la blockchain. L'expéditeur achète la quantité totale de gas (c'est-à-dire la limite de gas) à l'avance, au début de l'exécution de la transaction, et est remboursé à la fin pour tout gas non utilisé. Si, à un moment donné, la transaction ne dispose pas de suffisamment de gas pour effectuer l'opération suivante, la transaction est annulée, mais l'expéditeur continue de payer le gas utilisé. Les prix du gas sont généralement libellés en Gwei, une sous-unité d'ETH égale à $10^{-9} ETH$.

Ce mécanisme de tarification est conçu pour atténuer le spam des transactions, empêcher les boucles infinies pendant l'exécution du contrat et permettre une allocation des ressources du réseau basée sur le marché.

## Dapp

Les applications décentralisées (**dApps**) sont des applications ou des programmes numériques qui existent et s'exécutent sur une blockchain, elles échappent ainsi au contrôle d'une autorité unique.
Par exemple une application web standard, comme Uber ou Twitter, fonctionne sur un système informatique appartenant à une organisation, ce qui lui confère une autorité totale sur l'application et son fonctionnement. Il peut y avoir plusieurs utilisateurs, mais le backend est contrôlé par une seule organisation.

Les DApps peuvent fonctionner sur un réseau **P2P** ou un réseau **blockchain**. Dans le contexte des crypto-monnaies, les dApps s'exécutent sur un réseau blockchain dans un environnement public, open source et décentralisé et sont libres de tout contrôle et de toute interférence de la part d'une autorité unique.
Par exemple, un développeur peut créer une dApp de type Twitter et la placer sur une blockchain où tout utilisateur peut publier des messages. Une fois publiés, personne **y compris le créateur de l'application** ne peut supprimer les messages.
La blockchain Ethereum permet l'exécution de Dapp sur sa machine virtuelle, ces dapp se présentent le plus souvent sous une forme simple de smart contract. Un smart contract est un contrat auto-exécutoire dont les termes de l'accord entre l'acheteur et le vendeur sont directement inscrits dans des lignes de code.

## Web3

Web2 fait référence à la version d'internet que la plupart d'entre nous connaissent aujourd'hui. Un internet dominé par des entreprises qui fournissent des services en échange de vos données personnelles. Web3, dans le contexte d'Ethereum, fait référence aux applications décentralisées qui fonctionnent sur la blockchain. Il s'agit d'applications qui permettent à quiconque de participer sans monétiser ses données personnelles.

De nombreux développeurs Web3 ont choisi de construire des dapps en raison de la décentralisation inhérente à Ethereum :
- Toute personne présente sur le réseau a la permission d'utiliser le service ou en d'autres termes, la permission n'est pas nécessaire.
- Personne ne peut vous bloquer ou vous refuser l'accès au service.
- Les paiements sont intégrés via le jeton natif, l'éther (ETH).
- Ethereum est turing-complet, ce qui signifie que vous pouvez programmer à peu près n'importe quoi.

Pour plus d'informations sur Web3 : [Web2 vs Web3](https://ethereum.org/en/developers/docs/web2-vs-web3/)

## Transactions

Les transactions sont des instructions signées cryptographiquement par les comptes. Un compte va initier une transaction pour mettre à jour l'état du réseau Ethereum. La transaction la plus simple consiste à transférer des ETH d'un compte à un autre.

Une transaction Ethereum fait référence à une action initiée par un compte appartenant à un tiers, en d'autres termes un compte géré par un humain, et non par un contrat. Par exemple, si Bob envoie à Alice 1 ETH, le compte de Bob doit être débité et celui d'Alice doit être crédité. Cette action de changement d'état a lieu dans le cadre d'une transaction.

## Nœuds et clients

Un client est une implémentation d'Ethereum qui vérifie toutes les transactions dans chaque bloc, ce qui garantit la sécurité du réseau et l'exactitude des données.

Il est possible de se faire une idée en temps réel du réseau Ethereum en regardant la [carte des nœuds](https://etherscan.io/nodetracker).

Il existe de nombreux clients Ethereum, dans une variété de langages de programmation fonctionnant sur différents systèmes d'exploitation. Ce que ces implémentations ont en commun, c'est qu'elles suivent toutes une spécification formelle (décrite dans le [Livre Jaune d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)). Cette spécification dicte le fonctionnement du réseau Ethereum et de la blockchain.

Pour en savoir plus : [ethereum.org](https://ethereum.org/en/developers/docs/nodes-and-clients/#clients)

## Miner Extractable Value (MEV)

Avec Ethereum, les mineurs sont responsables de la sélection et de l'agrégation des transactions dans les blocs. Il est important de noter qu'ils ont une autonomie totale pour décider quelles transactions de la mempool ils vont inclure dans les blocs qu'ils produisent. Comme les mineurs, les validateurs et les séquenceurs optimisent leurs profits, ils ont tendance à sélectionner et à ordonner les transactions en fonction du prix du gas ou des frais de transaction les plus élevés. Cependant, le protocole n'exige pas que les transactions soient ordonnées en fonction des frais. Les mineurs peuvent réordonner les transactions pour extraire des profits supplémentaires des utilisateurs. La valeur "MEV" correspond à ces profits.

Par example un mineur peut voir qu'une transaction va rapporter beaucoup d'argent à un utilisateur, il peut décider alors de ne pas inclure cette transaction et l'effectuer à la place de l'utilisateur.

## Oracle

Les oracles sont des flux de données qui connectent Ethereum à des informations hors chaîne, dans le monde réel, afin de pouvoir interroger les données dans des smart contracts. Par exemple, les Dapps de marché prédictif utilisent des oracles pour régler les paiements en fonction d'un ou des événements. Un marché prédictif peut vous demander de parier votre ETH sur le prochain président. Le marché utilisera un oracle pour confirmer le résultat et payer les gagnants.
