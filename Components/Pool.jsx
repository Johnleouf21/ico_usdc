import {BigNumber, ethers} from 'ethers';
import { useState, useEffect, useContext } from 'react';
import { ConnectionContext, ContractContext } from '../context'
import Pool6 from './Pool6';
import Pool12 from './Pool12';
import Pool24 from './Pool24';


export default function Pool() {

    const [DenariusABI, ICOABI, DenariusAddress, ICOAddress, StakingAddress, StakingABI] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState({});
    const [balance, setBalance] = useState({});;
    const [visibleDiv, setVisibleDiv] = useState(0);

    useEffect(() => {
    setLoader(false); 
    balanceOf()
    fetchData()
    }, [address])

    function handleButton1() {
        setVisibleDiv(1);
    }

    function handleButton2() {
    setVisibleDiv(2);
    }

    function handleButton3() {
    setVisibleDiv(3);
    }

    async function fetchData() {
        const contract = new ethers.Contract(StakingAddress, StakingABI.abi, provider);
        const stakingDuration = await contract.stakingDuration();
        const fixedAPY = await contract.fixedAPY();
        const startPeriod = await contract.startPeriod();
        const lockupDuration =  await contract.lockupDuration();
        const stakingMax =  await contract.stakingMax();
        const lockupPeriod =  await contract.lockupPeriod();
        const endPeriod =  await contract.endPeriod();
        const totalDeposited =  await contract.totalDeposited();
        const staked =  await contract.staked(address);
        //const rewardOf =  await contract.rewardOf(address);
        //const _userStartTime =  await contract._userStartTime(address);
        const object = {
            stakingDuration: String(stakingDuration),
            fixedAPY: String(fixedAPY),
            startPeriod: String(startPeriod),
            lockupDuration: String(lockupDuration),
            stakingMax: String(stakingMax),
            lockupPeriod: String(lockupPeriod),
            endPeriod: String(endPeriod),
            totalDeposited: String(totalDeposited),
            staked: String(staked),
            //rewardOf : String(rewardOf),
            //_userStartTime: String(_userStartTime),
        }
        setData(object);
        console.log(object)
    }

    async function balanceOf() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(DenariusAddress, DenariusABI.abi, signer);
        try {
        const balance = await contract.balanceOf(address);
        const object = {
            balance : String(balance),
        }
        setBalance(object);
        console.log(object)
        }
        catch(err) {
            console.log(err);
        }
    }


    return (
    <>
        <div style={{textAlign: 'center'}}>
            <p className="text-base text-grey mb-3">
                Wallet : {address.slice(0,5)+'...'+address.slice(38,42)}
            </p>
            <p className="text-base text-grey">
                My wallet balance : {(balance.balance/10**18).toFixed(2)} $DENAR
            </p>
        </div>
        <div class="flex justify-between ">
            <div className=" mx-20 my-10 ">
                    <button onClick={handleButton1}>
                        <div className="square">
                            <div className="square-title">Denarius Pool 1</div>
                            <div className="square-content">
                                {data.stakingDuration/86400} days<br/>
                                (Lock-up: {data.lockupDuration/86400} days)<br/>
                                {data.fixedAPY}% APR<br/><br/>
                                Space left : {((data.stakingMax/10**18).toFixed(2))-((data.totalDeposited/10**18).toFixed(2))} $DENAR
                            </div>
                        </div>
                    </button>       
            </div>
            <div className=" mx-20 my-10 ">
                <button onClick={handleButton2}>
                <div className="square">
                    <div className="square-title">Denarius Pool 2</div>
                    <div className="square-content">
                        {data.stakingDuration/86400} days<br/>
                        (Lock-up: {data.lockupDuration/86400} days)<br/>
                        {data.fixedAPY}% APR<br/><br/>
                        Space left : {((data.stakingMax/10**18).toFixed(2))-((data.totalDeposited/10**18).toFixed(2))} $DENAR
                    </div>
                </div>
                </button>         
            </div>
            <div className=" mx-20 my-10 ">
                <button onClick={handleButton3}>
                <div className="square">
                    <div className="square-title">Denarius Pool 3</div>
                    <div className="square-content">
                        {data.stakingDuration/86400} days<br/>
                        (Lock-up: {data.lockupDuration/86400} days)<br/>
                        {data.fixedAPY}% APR<br/><br/>
                        Space left : {((data.stakingMax/10**18).toFixed(2))-((data.totalDeposited/10**18).toFixed(2))} $DENAR
                    </div>
                </div>
                </button>       
            </div>
        </div>
        <div style={{textAlign: 'center'}}>
        {visibleDiv === 1 && <Pool24/>}
        {visibleDiv === 2 && <Pool12/>}
        {visibleDiv === 3 && <Pool6/>}
        </div>
    </>
    );

}
