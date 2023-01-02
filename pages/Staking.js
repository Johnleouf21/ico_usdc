import { ConnectionContext } from '../context'
import { useContext, React } from 'react'
import Pool from '../Components/Pool';

export default function Staking() {

  const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

  if (connected) {
    return (
      <Pool/>
    );
  }  
}
