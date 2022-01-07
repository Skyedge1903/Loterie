import Web3 from 'web3/dist/web3.min'

const getWeb3 = () => new Promise((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask).
    const alreadyInjected = typeof web3 !== 'undefined'

    if (alreadyInjected) {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)
      console.log('Injected web3 detected.');
      resolve(web3)
    } else {
      web3 = new Web3('ws://localhost:9545');
      console.log('No web3 instance injected, using Local web3.');
      resolve(web3)
    }
  })
})

export default getWeb3
