import { createContext, useContext, useState, useEffect } from 'react';
import DenariusABI from '../artifacts/contracts/Denarius.sol/Denarius.json'
import ICOABI from '../artifacts/contracts/ICO.sol/ICO.json'
import StakingABI from '../artifacts/contracts/DenariusStaking.sol/DenariusStaking.json'

const ConnectionContext = createContext({});
const ContractContext = createContext({});




const Provider = ({ children }) => {
    const [connected, setConnected] = useState(false)
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState(null)
    const [isChainCorrect,setIsChainCorrect] = useState(null)
    const value = [connected, setConnected, provider, setProvider, address, setAddress, isChainCorrect, setIsChainCorrect]

    return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

export { ConnectionContext, Provider };

const Contract = ({ children }) => {
    const DenariusAddress = '0x4FB7433Eba116cbDcc83CfBf8b2b3D64d9080AFf'
    const ICOAddress = '0x8971649dcc493543a0191178bF488ef50a5A910e'
    const StakingAddress = '0x9c4d454d2815c580633322d8f105E0700149951F'
    const value = [DenariusABI, ICOABI, DenariusAddress, ICOAddress, StakingAddress, StakingABI]

    return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

export { ContractContext, Contract };
