import { ConnectionContext } from '../context'
import { useContext, React } from 'react'
import Ico from '../Components/Ico';

export default function ICO() {

  const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

  if (connected) {
    return (
      <Ico/>
    );
  }  
}
