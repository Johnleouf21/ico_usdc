import { ConnectionContext } from '../context'
import { useContext, React } from 'react'
import Project from '../Components/Project';

export default function Home() {

  const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)

  if (connected) {
    return (
      <Project/>
    );
  }  
}
