# ERC20

La blockchain ethereum permet d'implémenter des tokens. Un token est une unité de mesure, dont les unités peuvent être utilisées par des portefeuilles ethereum et des smart contracts. Les règles régissant cette utilisation sont définies par le smart contract régissant le token.

[ERC-20 Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

Les Tokens peuvent représenter des bulletins de vote, une monnaie, un ticket de cinéma ou tout autre chose dénombrable ou quantifiable. 

Avoir la possibilité de créer librement un token personnalisé offre une grande liberté de création, accompagnée par divers contraintes techniques. Les deux majeures étant la sécurité et l'interopérabilité.

Les smart contracts étant immuables, il est important qu'ils soient implémentés correctement dès le début. En l'occurence, une faille de sécurité dans les smart contracts régissant l'utilisation du token peut aboutir au vol des tokens détenus par les membres. 

Par ailleurs, l'utilisation de smart-contracts est plus aisée si elle est standard. De fait, il est interessant d'avoir une API identique d'un token à l'autre. 

ERC-20 est un standard de création de token ayant pour objectif de répondre à ces problématiques, en spécifiant une API interne au smart contract. Pour implémenter un token ERC20, il faut respecter cette interface:


```solidity
interface {
    // functions optionelles
    function name() public view returns (string);
    function symbol() public view returns (string);
    function decimals() public view returns (uint8);
    
    
    // fonction requises
    function totalSupply() public view returns (uint256);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function transfer(address _to, uinte256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);
    
    //events
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

```


## ERC 777

Depuis l'ERC-20 datant de 2015, des améliorations rétrocompatibles avec l'ERC-20 ont été proposées. L'[ERC-777](https://ethereum.org/en/developers/docs/standards/tokens/erc-777/#top) en fait partie.
