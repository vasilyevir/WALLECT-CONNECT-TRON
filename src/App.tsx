import './App.css'
import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";
import {useState} from "react";
import TronWeb from 'tronweb';
import { Buffer } from 'buffer';

// @ts-ignore
export function App() {
  const [addressUser, setAddressUser] = useState('');
  const adapter = new WalletConnectAdapter({
    network: 'Mainnet',
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

  // @ts-ignore
  window.Buffer = Buffer;

  const connect = async () => {
    await adapter.connect();
    setAddressUser(adapter.address || '')
  }

  const approve = async () => {
    // const contract = await tronWeb.contract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t')
    // console.log(contract)
    // console.log(tronWeb)
    const walletconnectAdapter = adapter
    try {
      const functionSelector = 'transfer(address,uint256)';
      const parameter = [{type:'address',value: addressUser},{type:'uint256',value:1}]
      const tx = await tronWeb.transactionBuilder.triggerSmartContract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', functionSelector, {
        feeLimit: 1_000_000,
        callValue: tronWeb.toSun(0.1)
      }, parameter, 'TAVTYWfbRzYuCppqgHcshxhaCbVGUWqdc5');
      console.log('tx', tx)
      //@ts-ignore
      // const signedTx = await
      console.log('signedTx', await walletconnectAdapter.signTransaction(tx.transaction))
      // const result = await tronWeb.trx.sendRawTransaction(signedTx);
      // console.log('result', result)
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
