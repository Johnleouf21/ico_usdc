import {BigNumber, ethers} from 'ethers';
import { useState, useEffect, useContext } from 'react';
import { ConnectionContext, ContractContext } from '../context'


export default function Pool12() {

    const [DenariusABI, ICOABI, DenariusAddress, ICOAddress, StakingAddress, StakingABI] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState({});
    const [reward, setReward] = useState({});
    const [value, setValue] = useState('');


    useEffect(() => {
    setLoader(false); 
    rewardOf()
    fetchData()
    }, [address])

    const handleChange = event => {
        setValue(event.target.value);
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
        const staked =  await contract.staked(address);
        const object = {
            stakingDuration: String(stakingDuration),
            fixedAPY: String(fixedAPY),
            startPeriod: String(startPeriod),
            lockupDuration: String(lockupDuration),
            stakingMax: String(stakingMax),
            lockupPeriod: String(lockupPeriod),
            endPeriod: String(endPeriod),
            staked: String(staked),
        }
        setData(object);
        console.log(object)
    }

    async function deposit () {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(StakingAddress, StakingABI.abi, signer);
        const Denarius = new ethers.Contract(DenariusAddress, DenariusABI.abi, signer);
        const DenariusApproval = (value*10**18).toString();

        try {
            let overrides = {
                from: address,
            }
        const transaction = await Denarius.approve(StakingAddress, DenariusApproval, overrides);
        await transaction.wait();
            let overrides2 = {
                from: address,
            }
        const transaction2 = await contract.deposit(DenariusApproval, overrides2);
        await transaction2.wait()
        }
        catch(err) {
            console.log(err);
        }
    }

    async function rewardOf() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(StakingAddress, StakingABI.abi, signer);
        try {
        const rewardOf = await contract.rewardOf(address);
        const object = {
            rewardOf : String(rewardOf),
        }
        setReward(object);
        console.log(object)
        }
        catch(err) {
            console.log(err);
        }
    }

    async function claimRewards() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(StakingAddress, StakingABI.abi, signer);
        try {
        const claim = await contract.claimRewards();
        await claim
        }
        catch(err) {
            console.log(err);
        }
    }


    return (
                <div>
                    <div className="square-title">Denarius Pool 2</div>
                    <p className="text-base text-grey mt-3">
                        My token staked : {(data.staked/10**18).toFixed(0)} $DENAR
                    </p>
                    <p className="text-base text-grey">
                        My pending rewards : {(reward.rewardOf/10**18).toFixed(2)} $DENAR 
                        
                    </p>
                        <button type="button"
                            onClick={claimRewards}
                            className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Claim {(reward.rewardOf/10**18).toFixed(2)} $DENAR 
                        </button>
                    <button type="button"
                            onClick={deposit}
                            className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Stake {value} $DENAR
                            </button>
                            <input 
                            style={{
                                backgroundColor: "rgb(251 113 133)", 
                                textAlign: "center", 
                                padding: "5px", 
                                borderRadius: "8px", 
                                border: "solid",
                                width: "100px"
                                }} 
                                type="number" min={1} onChange={handleChange} value={value}/> $DENAR
                </div>
    );

}
