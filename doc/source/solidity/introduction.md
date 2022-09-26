# Solidity

Solidity est un language de programmation orienté-objet dédié à l'écriture de *smart contracts* sur la blockchain Ethereum. Sous sa forme compilée, Solidity peut être exécuté par la machine virtuelle d'Ethereum (EVM). 

## Versionning

Chaque fichier solidity commence par spécifier sa version. C'est relativement important dans le contexte de smart contract car les contrats peuvent s'appeler entre-eux et il faut donc établir un compatibilité en fonction des changements du language au cours du temps.

```solidity
pragma solidity >=0.5.0 <0.6.0;
```

## Import

Un fichier solidity peut un importer un autre pour permettre aux contrats d'hériter d'autres contrats.

```solidity
import "fichier.sol";
```

## Définir un contrat

Définir un contrat est très similaire à la définition d'une classe dans un language de programmation orienté objet classique. Cette classe a un état qui est sauvegardé dans la chaîne de block, elle a des méthodes qui sont privées ou publiques, etc.

```solidity
contract Example {
  uint monEntier = 42;
  
  function increment() public {
    monEntier = monEntier + 1;
  }
}
```

Dans cet exemple, à la création du contrat, la variable `monEntier` a la valeur 42 qui est inscrite dans le block contenant la transaction qui créer le contrat. Dans les blocks suivants les contrat est alors accessible, on peut donc appelé la fonction `increment()` qui va incrémenter `monEntier`. La fonction étant `public` chacun a la possibilité de créer une transaction qui incrémentera la valeur sur la chaîne.

## Méthodes

### Accessibilité
Chaques méthodes d'un contrat a une accessibilité bien définie. Cette accessibilité est définie par des *modifiers*.

- `external` : La méthode ne peut qu'être appelé de l'extérieur
- `internal` : La méthode ne peut qu'être appelé par une méthode interne au contrat ou contrat dérivés (équivalent de protected)
- `public` : La méthode peut être appelé de n'importe quel contexte
- `private` : La méthode ne peut qu'être appelé par une méthode interne au contrat


### Type de retour

Un type de retour peut être spécifié en utilisant le modifier `returns`

```solidity
function fn() public returns(uint) {}
```

### Autres modifiers

- Le modifier `pure` indique que la méthode ne modifiera pas l'état du contrat et ne lira pas l'état du contrat
- Le modifier `view` indique que la méthode ne modifiera pas l'état du contrat


### Modifier custom

Il est possible de créer ses propres modifiers :

```solidity
modifier isOwner() {
    require(owner == msg.sender)
    _;
}

function withdraw() external isOwner() {...}
```

Ici la fonction withdraw appelera `isOwner()` avant sa propre exécution.  
`_;` indique où le flux de controle prend fin pour le modifier, on peut imaginer le code de withdraw à sa place.

### Méthode et point d'entrée 

Chaque méthode qui peuvent être appelé de l'extérieur est un point d'entrée. En effet pour commencer une l'éxecution de code au sein d'un smart contract il est nécessaire qu'une transaction Ethereum commence cette exécution via l'appel d'une fonction `public` ou `external`.

## Types

- `int`/`uint` (de 8 bits à 256)
- Pas de float pour éviter les imprécisions
- `bool`
- `string`
- `enum`

### Structures

Il est possible de créer des structures composés de plusieurs types :

```solidity
contrat MonContrat {
    struct personne {
        string name;
        uint age;
    }
    
    function test1() internal returns(personne) {
        ...
    }
    
    function test2() public {
        (name, age) = test1();
    }
}
```

## Évènements

Les évènements permet aux applications web3.0 de logger des données lors de leurs émissions

```solidity
event stored(uint data);

function store(uint256 _val) public {
    val = _val;
    emit stored(val);
}
```

```javascript
const EventExample = artifacts.require("EventExample");
module.exports = function (deployer) {
   deployer.deploy(EventExample);
};
let tx = await eventExample.store(10);
```

## Héritage

Un contrat peut hériter d'autres contrats avec `is`:

```solidity
contract MonContract is Ownable, ERC20 {...}
```

Les constructeurs de Ownable et ERC20 seront appelés au même moment que celui de MonContrat, c'est à dire à la création du contrat.

## Propriétés du block et transaction

Les propriétés du block de la transaction est accessible via l'objet global `block`, il contient les attributs et méthodes suivantes:

- `block.coinbase` (address payable): addresse du mineur du bloc courant
- `block.difficulty` (uint): difficulté du bloc courant
- `block.gaslimit` (uint): limite de gas actuelle
- `block.number` (uint): numéro du bloc courant
- `block.timestamp` (uint): timestamp du bloc en temps unix (secondes)

Les propriétés de la transaction est accessible via l'objet global `msg`:
- `msg.data` (bytes calldata): calldata complet
- `msg.sender` (address payable): expéditeur du message (appel courant)
- `msg.sig` (bytes4): 4 premiers octets calldata (i.e. identifiant de function)
- `msg.value` (uint): nombre de wei envoyés avec le message

## Unités

Il y a plusieurs unités pour spécifier le temps et des quantités d'Ether:

Quantité:
- `1 wei` == 1
- `1 szabo` == 1e12
- `1 finney` == 1e15
- `1 ether` == 1e18

Temps:
- `1 seconds` == 1
- `1 minutes` == 60 seconds
- `1 hours` == 60 minutes
- `1 days` == 24 hours
- `1 weeks` == 7 days

## Address 

`address` est un type spécial qui correspond à des addresses publiques ethereum. Ce type a une seconde version `address payable` qui a deux méthodes en plus `send` et `transfert`. On ne peut pas convertir de `address` à `address payable` implicitement ce qui permet au lecteur du contrat de savoir facilement qui peut être payer dans le contexte d'un contrat.

## Interface & library

Les interfaces permettent de définir une liste d'event et function virtuelle pure pour obliger les contrats qui les héritent de fournir une implémentation concrète.

```solidity
interface Example {
    function example() external view returns(uint);
}

contract Test is Example {
    constructor() public {
        ...
    }
    
    function example() external view returns(uint) {
        ...
    }
}
```


Les library, elles fournissent une implémentation concrète de fonctions qui sont "pures" dans le sens classique du terme (ne dépend pas d'un état => en général, avec les mêmes arguments retournes tj les mêmes résultats) 
```solidity
library Lib1 {
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        ...
    }
}
```
