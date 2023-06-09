import './App.css'
import {WalletConnectChainID, WalletConnectWallet} from "@tronweb3/walletconnect-tron";
import {useState} from "react";
import TronWeb from 'tronweb';

export function App() {
  const [addressUser, setAddressUser] = useState('');
  const wallet = new WalletConnectWallet({
    network: WalletConnectChainID.Mainnet,
    options: {
      relayUrl: 'wss://relay.walletconnect.com',
      projectId: 'c9024b147776f06d4fa6e75a68c0e220',
      metadata: {
        name: 'Liquid Mining',
        description: 'Liquid Mining WalletConnect',
        url: 'https://liquidmining.com/',
        icons: ['https://app.justlend.org/mainLogo.svg']
      }
    },
  })


  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': 'faafc2f3-1510-4a3b-88a4-ce173fa433d8' },
  });
  console.log(tronWeb)

  const connect = async () => {
    const { address } = await wallet.connect();
    setAddressUser(address)
  }

  const approve = async () => {
    // const contract = await tronWeb.contract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t')
    // console.log(contract)
    // console.log(tronWeb)
    try {
      const unSignedTransaction = await tronWeb.transactionBuilder.sendTrx('TU8tu9ihY4PzGvsz8WYV4BPXKwVQJFSChY', 100, 'TAVTYWfbRzYuCppqgHcshxhaCbVGUWqdc5');
      console.log(unSignedTransaction)
      const signedTransaction = await wallet.signTransaction(unSignedTransaction);
      console.log(signedTransaction)
    } catch (e) {
      console.log('e:', e)
    }

    // await tronWeb.trx.sendRawTransaction(signedTransaction);
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={approve}>Approve</button>
      <p>address: {addressUser}</p>
    </>
  )
}

export default App
