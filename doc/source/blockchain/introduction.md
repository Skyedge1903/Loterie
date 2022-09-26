# Blockchain

>Une blockchain, est une technologie de stockage et de transmission d'informations sans organe de contrôle. Techniquement, il s'agit d'une base de données distribuée dont les informations envoyées par les utilisateurs et les liens internes à la base sont vérifiés et groupés à intervalles de temps réguliers en blocs, formant ainsi une chaîne. L'ensemble est sécurisé par cryptographie. Par extension, une chaîne de blocs est une base de données distribuée qui gère une liste d'enregistrements protégés contre la falsification ou la modification par les nœuds de stockage ; c'est donc un registre distribué et sécurisé de toutes les transactions effectuées depuis le démarrage du système réparti.
>
>Il existe une analogie avec le réseau Internet, car dans les deux cas les technologies emploient des protocoles informatiques liés à une infrastructure décentralisée. Internet permet de transférer des paquets de données d'un serveur « sûr » à des clients distants (charge aux destinataires de vérifier l'intégrité des données transmises), alors qu'une blockchain permet à la « confiance » de s'établir entre des agents distincts du système. Avec la technologie blockchain, le « tiers de confiance » devient le système lui-même : chaque élément réparti de la blockchain contient les éléments nécessaires pour garantir l'intégrité des données échangées (par un algorithme cryptographique). 
>
>[Blockchain sur Wikipedia](https://fr.wikipedia.org/wiki/Blockchain)

## Introduction

La `blockchain` est donc un grand registre **décentralisé**, qui tient à jour une liste sans cesse croissante de transactions groupées en `blocs`.

<iframe width="534" height="300" src="http://www.youtube.com/embed/3rL0OIXbMio?rel=0" frameborder="0" allowfullscreen></iframe>

Exemple d'un blochaine simpliste à quatres transactions par bloc :
```{mermaid}
    classDiagram
    direction LR
        BLOCK 554 --> BLOCK 555
        BLOCK 555 --> BLOCK 556
        BLOCK 556 --> BLOCK 557
        class BLOCK 554{
            Transaction 1000
            Transaction 1001
            Transaction 1002
            Transaction 1003
        }
        class BLOCK 555{
            Transaction 1004
            Transaction 1005
            Transaction 1006
            Transaction 1007
        }
        class BLOCK 556{
            Transaction 1008
            Transaction 1009
            Transaction 1010
            Transaction 1011
        }
        class BLOCK 557{
            Transaction 1012
            Transaction 1013
            Transaction 1014
            Transaction 1015
        }
```

Un bloc est donc un ensemble organisé de transactions. Chaque bloc contient également :
- un horodatage donnant **l'heure et la date de validation** 
- La signature (hash) du bloc précédent
- une preuve **de travail, d'enjeu ou d'autorité** inclus par le validateur.

Exemple de composition d'un bloc :

```{mermaid}
    classDiagram
    direction LR
        class BLOCK 557{
            index : 0
            timestamp : 23:36 04/10/2021
            data : "transactions du block 557"
            hash : 0x54eaff5...b77
            previousHash : 0x87feb7e...aef
        }
```
## Caractéristiques d'une blockchain 

L'usage primaire des blockchain est l'échange de cryptomonnaies. Généralement, une blockchain répondra aux propriétés suivantes :
Ces propriétés sont décrites comme les cinque piliers de la blockchain.
Ces propriétés permettent également de discriminer clairement les blockchains décentralisées des portefeuilles numériques comme paypal ou kakaopay.

[*The Five Pillars of Open Blockchains* par Andreas A Antonopoulos sur Youtube](https://www.youtube-nocookie.com/embed/qlAhXo-d-64)

<!-- <iframe width="534" height="300" src="https://www.youtube-nocookie.com/embed/qlAhXo-d-64" frameborder="0" allowfullscreen></iframe> -->

### Une blockchain est ouverte

Une crypto-monnaie ouverte est accessible à tous, sans décliner d'identité ou obtenir d'autorisation quelconque. Tout le monde peut y accéder, tout le monde peut y participer. Le prérequis étant seulement d'être connecté au même réseau : internet.

En réalité, il n'est même par requis d'être une personne phisique pour détenir et échanger des cryptomonnaies. Des organisations décentralisées ou des programmes informatiques (appelés smart contracts) peuvent également détenir et manipuler leurs propres fonds en cryptomonnaies.

### Une blockchain n'a pas de frontières

Les cryptomonnaies, à l'instar d'internet n'ont pas de frontières, Internet est partout, et nulle-part de précis à la fois.

Andreas soulève un point intéressant à ce sujet. Lorsque vous traversez les frontières via les aéroports, de nombreux bureaux de garde exigent que vous déclariez si vous transportez des "instruments monétaires ou convertibles" d'une valeur supérieure à 10 000$.

Il déclare qu'il possède des bitcoins, mais transfère-t-il ou transporte-t-il quelque chose ? Il possède des clés privées, qui ne sont que des nombres, et qui ne sont pas les véritables bitcoins, mais plutôt des codes PIN. Or les personnes transportant des cartes de crédit et de débit d'une valeur supérieure à 10 000 USD n'ont pas besoin de déclarer quoi que ce soit, puisqu'elles n'ont qu'un code PIN.

Que se passe-t-il lorsque l'argent n'est pas ici ou là ? Et s'il est partout ? Nous avons maintenant un nouveau problème étrange. Andreas donne l'exemple du tweet d'une transaction en bitcoin... a-t-il transporté de l'argent ? Difficile à dire. Certains diront que oui, d'autres que non.

Andreas A Antonopoulos remarque que nos lois et nos règles frontalières sont conçues en partant du principe que l'argent "est quelque part de bien identitifé", comme physiquement présent. Il s'agit probablement d'un vestige de l'ère de l'or et de la monnaie, qui s'est perpétué à l'ère de la monnaie fiduciaire, et qui n'a pas changé lorsque nous avons commencé à utiliser la monnaie fiduciaire électronique.

Avec les cryptomonnaies, l'argent est devenu une information qui n'a aucune présence physique et qui n'existe en aucun lieu. 

### Une blockchain est neutre

Le concept de neutralité dans la blockchain et les crypto-monnaies signifie qu'une crypto-monnaie peut être déplacée/transférée d'un compte à un autre sans interception ni questionnement. La neutralité signifie que la crypto-monnaie est à vous pour envoyer ou recevoir de qui que ce soit, quand et où que ce soit.

La blockchain ne se soucie pas de savoir qui envoie des bitcoins (ou une autre crypto-monnaie) à quelqu'un d'autre, ni pourquoi ou à qui ils sont envoyés. Elle est agnostique aux comptes, aux personnes, aux raisons - elle est neutre.

Cela semble radical, mais c'est ainsi que le monde fonctionnait il y a seulement quelques décennies, pendant des milliers et des milliers d'années. Les gens payaient avec de l'or, puis avec des billets de banque adossés à de l'or. Même le fiat moderne était utilisé avec une grande liberté jusqu'à il y a quelques décennies. 

### Une blockchain est résistante à la censure

La résistance à la censure signifie qu'une autorité ne peut pas empêcher le transfert de fonds d'un portefeuille à un autre.

### Une blockchain est publique

Public est l'idée que tout ce que vous faites est vérifiable sur le réseau par n'importe qui d'autre. Cela suggère qu'il devient très difficile de tricher, si tout le monde peut voir le mouvement des fonds, alors tout le monde peut surveiller l'activité des autres. 

L'aspect publique implique également que tout le monde peut travailler sur le réseau. Andreas utilise l'exemple d'un réseau de paiement coréen qui exige que vous ayez un numéro de téléphone coréen. Il est impossible de créer une application ou un logiciel qui étende ce réseau à des numéros de téléphone non coréens, car il s'agit d'un réseau privé. C'est la même chose pour PayPal. Vous pouvez vous connecter à PayPal, mais PayPal gère la transaction. Vous ne pouvez pas créer une application au-dessus de PayPal pour étendre ses services.

À l'inverse, avec les vraies crypto-monnaies, vous pouvez construire et étendre les protocoles. Vous pouvez créer une application qui autorise les paiements en bitcoins (ou autres) pour payer une place de cinéma, votre restaurant de quartier, votre abonnement telephonique, etc. Vous pouvez même écrire du code pour des applications qui permettent des offres de jetons de sécurité, des smart contracts (programmes manipulant de l'argent) ou votre propre crypto-monnaie.

---

Ces caractéristiques : ouvert, public, sans frontières, neutre et résistant à la censure, différencient les cryptomonnaies basées sur des blockchain telles que le bitcoin ou l'ether, des monnaies numériques privées telles que paypal. 

## Consensus 

Un consensus dans une blockchain est le processus par lequel un réseau de nœuds mutuellement méfiants parvient à un accord sur l'état global de la chaîne de blocs. Dans une blockchain, les transactions ou les données sont partagées et distribuées sur le réseau. Chaque nœud possède la même copie des données de la blockchain. Le consensus permet à tous les nœuds du réseau de suivre les mêmes règles pour valider les transactions et ajouter de nouveaux blocs à la chaîne, et permet donc de maintenir l'uniformité dans toutes les copies d'une blockchain.

Il existe de nombreux protocoles qui permettent d'arriver à un consensus, nous allons donc présenter les deux plus utilisés et réputés. Nous verrons par la suite quels peuvent être les limites de ce consensus. 

### Preuve de travail

Le protocole **Proof of Work** est l'un des premiers protocoles de consensus utilisés dans les applications blockchain. Il est basé sur le calcul des valeurs de **hachage** et la validation des transactions jusqu'à ce qu'un **nombre spécifique de zéros à la fin** soit trouvé dans la valeur de hachage. Le nombre qui génère le hachage avec le nombre spécifié de zéros à la fin est connu comme un `nonce`. Un nonce est défini comme un nombre aléatoire qui génère le nombre spécifié de zéros de fin dans la fonction de hachage.

<iframe width="534" height="300" src="http://www.youtube.com/embed/3EUAcxhuoU4?rel=0" frameborder="0" allowfullscreen></iframe>

### Preuve d'enjeu

Dans le consensus de **Proof of Stake**, un validateur est choisi et se voit attribuer un bloc. Le mineur doit **bloquer une partie de sa crypto-monnaie** pour commencer à valider. Si le mineur réussit à valider la transaction, la récompense est la mise qu'il avait bloqué initialement, ainsi que certains **frais de transaction**. Si'il essaie de tricher, alors **il pert sa mise de départ**. C'est une façon de pénaliser les mauvais comportements et d'encourager les bons comportements.

### Attaque des 51% et rupture du consensus

Une `attaque des 51 %` est une attaque potentielle sur un réseau de blockchain, où **une seule** entité ou organisation est en mesure de **contrôler la majorité du taux de hachage**, ce qui peut provoquer une perturbation du réseau. Dans un tel scénario, l'attaquant disposerait d'une puissance de minage suffisante pour exclure ou modifier intentionnellement l'ordre des transactions. Il pourrait également **annuler les transactions** qu'il a effectuées pendant qu'il contrôlait le réseau, ce qui entraînerait un problème de **double dépense**.

<iframe width="534" height="300" src="http://www.youtube.com/embed/BuTj9raHQOU?rel=0" frameborder="0" allowfullscreen></iframe>

## Décentralisation

Dans la blockchain, la décentralisation fait référence au transfert de la confiance et de la prise de décision d'une association centralisée (individu, société ou groupe de personnes) vers un réseau dispersé. Les réseaux décentralisés s'efforcent de diminuer le degré de confiance que les membres doivent avoir les uns envers les autres. Ils limitent également la capacité des membres à exercer une pression ou une autorité sur les autres affin de corrompre le réseau.

## Immutabilité

Pour modifier une transaction enregistrée dans un bloc passé, il est nécessaire de **recalculer le hash du bloc qui la contient, ainsi que tous les hashs des blocs générés depuis**. La difficulté, les ressources informatiques, et in fine la consommation électrique nécessaire pour modifier la blockchain augmente donc proportionnellement à l’ancienneté de la transaction à modifier.

Ainsi, si un attaquant souhaite modifier une transaction qui a été incluse 5 blocs dans le passé, soit environ 50 minutes sur bitcoin, il devra recalculer le hash des 5 blocks tout en rattrapent son retard sur le réseau, ce qui est en principe irréalisable sauf dans le cas d'une attaque des 51%.

Source : <a href="https://www.coinhouse.com/fr/academie/blockchain/quest-ce-que-la-blockchain/">Coinhouse.com</a>

## Transparence

En raison de la nature ouverte de la blockchain, toutes les transactions peuvent être consultées de manière transparente, soit en ayant un nœud personnel, soit en utilisant des explorateurs de blockchain qui permettent à quiconque de voir les transactions en direct. Chaque nœud possède sa propre copie de la chaîne qui est mise à jour lorsque de nouveaux blocs sont confirmés et ajoutés. Cela signifie que si vous le souhaitez, vous pouvez suivre des Bitcoins ou des Ethereum où qu'ils aillent. 

Par exemple, des exchanges ont été piratés par le passé et ceux qui détenaient des bitcoins sur ces exchanges ont tout perdu. Bien que le pirate puisse être totalement anonyme, les bitcoins qu'il a extraits sont facilement traçables. Si les bitcoins volés lors de certains de ces piratages devaient être déplacés ou dépensés quelque part, cela se saurait.

## Crypto-monnaies

Les cryptomonnaies sont des actifs qui s'échangent de pair-à-pair, sans tier de confiance. Ces actifs n'ont pas de matérialisation physique et ne sont ni régulés, ni indexées sur quoi que ce soit. Les cryptomonnaies sont donc les devises de base échangés entre wallets au sein de la blockchain. Une unité de cryptomonnaie n'est pas indivisible, elle peux être fractionnée pour permettre l'échange de plus petites sommes au sein du réseau.

<iframe width="534" height="300" src="http://www.youtube.com/embed/a5XfQWUUZM8?rel=0" frameborder="0" allowfullscreen></iframe>

## Exemple d'applications

### DeFi

La finance décentralisée `DeFi` est une forme de finance basée sur la blockchain qui ne s'appuie **pas sur des intermédiaires financiers centraux** tels que des courtiers, des bourses ou des banques pour offrir des instruments financiers traditionnels, et qui utilise plutôt **les smarts contracts** disponible sur les blockchains modernes comme Ethereum. Les plateformes DeFi permettent aux gens de prêter ou d'emprunter des fonds à d'autres personnes, de spéculer sur les mouvements de prix d'une gamme d'actifs en utilisant des produits dérivés, de négocier des cryptocurrences, de s'assurer contre les risques et de gagner des intérêts sur des comptes de type épargne.

### Les NFT

Les NFT ou jeton non fongible, sont des jetons uniques sur la blockchain, il peuvent servir de certificat d'authenticité pour une oeuvre d'art phisique ou numérique. Il est impossible de trouver deux jeutons identiques comme il est impossible de le diviser. Les NFT apporte à l'art numérique une notion de rareté qui n'existait pas avant. Voir <a href="../solidity/erc721.html">ERC721</a>.

### Votes

De nombreux projets et études sur la blockchain tentent d'utiliser ses carractéristiques de consensus, d'immuabilité et de transparence afin d'implémenter un smart contract capable de réaliser des votes fiables. Cependant, il reste de nombreux problème à résoudre pour que la blockchain puisse être courrement utilisé pour des votes à grande échelle. Par exemple, il est important lors d'un vote que celui-ci reste anonyme pour éviter les influences et pressions. Cependant, comme la blockchain est un grand livre ouvert, cacher l'identité associée au vote de chaque paticipant peux s'avérer difficile.