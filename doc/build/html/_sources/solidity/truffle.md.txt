# Truffle

## Introduction 

Truffle est un framework dédié au développement, au test et à la simulation local d'applications (smart contracts) conçues pour la machine virtuelle d'Ethereum. 
Ce logiciel simplifie donc la vie des développeurs avec de nombreux outils et piplines.
Une foi le dévellopement terminé, truffle permetra également de déployer l'application sur la blockchaine test d'Ethereum ou en conditions réels sur la blockchaine principal.

Truffle intègre notamment la liste de fonctionnalités suivantes :

- Compilation, liaison, déploiement et gestion binaire des contrats intelligents intégrés.
- Tests automatisés des contrats pour un développement rapide.
- Un cadre de déploiement et de migration extensible et scriptable.
- Gestion de réseau pour le déploiement sur un nombre illimité de réseaux publics et privés.
- Gestion des paquets avec EthPM et NPM, en utilisant le standard ERC190.
- Console interactive pour une communication directe avec le contrat.
- Pipeline de construction configurable avec support pour une intégration étroite.
- Exécuteur de scripts externe qui exécute les scripts dans un environnement Truffle.

Source : <a href="https://www.trufflesuite.com/docs/truffle/overview">trufflesuite.com</a>

## Test

Les tests s'éxecute sur un contrat solidity, il faut d'abord importer le contrat

```javascript
const myContract = artifact.require('./MyContract.sol');
```

Cet objet `myContract` correspond à une forme non-deployée du code. La première étape est donc de le déployer. La fonction `contract` permet de regrouper tous les tests d'un contrat. On passe dans la fonction lambda un appel vers `before` qui nous permet d'éxecuter du code avant tous les autres tests qui sont déclarer avec la méthode `it`. 


```javascript
contract('MyContract', accounts => {
    const owner = accounts[0];
    
    before('deploy contract', async () => {
        contract = await myContract.deployed()
    });
    
    it('should have an owner', async () => {
        let current_owner = await contract.getOwner({from : accounts[0] });
        assert.equal(current_owner, owner, "The owner isn't the person who deployed the contract");
    });
});
```


On peut remarquer qu'il est nécessaire de préciser de quel compte un appel provient par example l'appel vers geOwner prend `{from : accounts[0]}` en argument alors que get owner n'a pas de paramètres :

```solidity
function getOwner() public view returns (address) {
    return owner;
}
```

On peut aussi tester les méthodes "payable" en passer une quantité de wei à la méthode en question.

```javascript
it('should accept deposits', async () => {
    let eth = web3.utils.toWei("0.001", 'ether');
    await contract.deposit(eth, {from: accounts[0], value: eth});
    let amount = await contract.getBalance({from: accounts[0]})
    assert.equal(amount.toString(), web3.utils.toBN(eth).toString());
});
```

Les méthodes "payable" attendent une quantité en `wei`. Pour faciliter cela web3 fourni des fonctions qui permettent des conversions sans pertes de `eth` vers `wei` et inversement. De la même manière que `getOwner`, l'appel de `deposit` prend deux arguments alors qu'il a une seul paramètres:

```solidity
function deposit(uint256 amount) payable public {
    require(msg.value == amount);
}
```

Sauf que dans ce cas ci l'`object literal` attends un `value` avec le nombre de wei. Une fois les frais traitées `msg.value` est  automatiquement attribuée au contrat si rien n'en ai fait. C'est pourquoi deposit ne fait rien d'autre que vérifier que `msg.value == amount`.

Le compte utilisé ici est fourni par truffle mais pour une *vraie* application web3 le compte serait un wallet connecté comme metamask.
