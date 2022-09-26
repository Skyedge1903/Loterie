# EVM

Bitcoin est un registre (grand livre) distribué qui permet éxecution d'une seule et unique application de façon décentralisée (l'application qui permet de transférer des bitcoins). Ethereum est différent puisqu'elle permet de créer n'importe quelle application. Pour permettre de faire cela il faut pouvoir exécuter du code arbitraire de façon décentralisée. Une machine virtuelle est donc nécessaire. L'EVM (Ethereum Virtual Machine) est cette machine virtuelle.

## State machine

![EVM](evm.png "EVM")

Cette state machine est une structure de données nommé ["Modified Merkle Patrica Trie"](https://eth.wiki/en/fundamentals/patricia-tree) qui est un type d'arbre Radix. Cette arbre conserve tous les comptes liés par des hash et réductibles à un seul hash "racine" stocké sur la blockchain

## Instructions

L'EVM est une stack machine qui a un certain nombre d'instructions classiques : `ADD`, `AND`, `ADD`, `SUB`, etc. associé à des instructions spécifiques telles que `ADDRESS`, `BALANCE`, `KECCAK256`, etc. Ces opérations ont un coût en gas.

![GAS](gas.png "Stack Machine")

## Implementations

L'EVM a plusieurs implémentations:
- [Py-EVM](https://github.com/ethereum/py-evm) - Python
- [evmone](https://github.com/ethereum/evmone) - C++
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-monorepo) - JavaScript
- [eEVM](https://github.com/microsoft/eevm) - C++
- [Hyperledger Burrow](https://github.com/hyperledger/burrow) - Go
- [hevm](https://github.com/dapphub/dapptools/tree/master/src/hevm) - Haskell
