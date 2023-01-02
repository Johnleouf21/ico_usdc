import {BigNumber, ethers} from 'ethers';
import ERC20 from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { useState, useEffect, useContext } from 'react';
import { ConnectionContext, ContractContext } from '../context'

const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

export default function Ico() {

    const [DenariusABI, ICOABI, DenariusAddress, ICOAddress, StakingAddress, StakingABI] = useContext(ContractContext)
    const [connected, setConnected, provider, , address, setAddress, isChainCorrect] = useContext(ConnectionContext)
    const [loader, setLoader] = useState(true);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
    setLoader(false); 
    fetchData()
    }, [address])

    const handleChange1 = event => {
        setValue(event.target.value);

        console.log('value is:', event.target.value)
    }
    const handleChange2 = event => {
        setValue2(event.target.value);

        console.log('value is:', event.target.value)
    }
    const handleChange3 = event => {
        setValue3(event.target.value);

        console.log('value is:', event.target.value)
    }
    
    async function fetchData() {
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, provider);
        const hardcapRound1 = await contract.hardCapRound1();
        const hardcapRound2 = await contract.hardCapRound2();
        const hardcapRound3 = await contract.hardCapRound3();
        const tokenAmountRound1 =  await contract.tokenAmountRound1();
        const tokenAmountRound2 =  await contract.tokenAmountRound2();
        const tokenAmountRound3 =  await contract.tokenAmountRound3();
        const balancesToken1 =  await contract.balancesToken1(address);
        const balancesToken2 =  await contract.balancesToken2(address);
        const balancesToken3 =  await contract.balancesToken3(address);
        const closingTimeRound1 = await contract.closingTimeRound1();
        const rateRound1 = await contract.rateRound1();
        const rateRound2 = await contract.rateRound2();
        const rateRound3 = await contract.rateRound3();
        const object = {
            hardcapRound1: ethers.utils.formatEther(hardcapRound1),
            hardcapRound2: ethers.utils.formatEther(hardcapRound2),
            hardcapRound3: ethers.utils.formatEther(hardcapRound3),
            tokenAmountRound1: ethers.utils.formatEther(tokenAmountRound1),
            tokenAmountRound2: ethers.utils.formatEther(tokenAmountRound2),
            tokenAmountRound3: ethers.utils.formatEther(tokenAmountRound3),
            balancesToken1: ethers.utils.formatEther(balancesToken1),
            balancesToken2: ethers.utils.formatEther(balancesToken2),
            balancesToken3: ethers.utils.formatEther(balancesToken3),
            closingTimeRound1 : String(closingTimeRound1),
            rateRound1: ethers.utils.formatEther(rateRound1),
            rateRound2: ethers.utils.formatEther(rateRound2),
            rateRound3: ethers.utils.formatEther(rateRound3),
        }
        setData(object);
    }
    
    async function buyTokensRound1 () {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);
            const usdc = new ethers.Contract(usdcAddress, ERC20.abi, signer);
            const usdcApproval = BigNumber.from(value*10**6);

            try {
                let overrides = {
                    from: address,
                }
            const transaction = await usdc.approve(ICOAddress, usdcApproval, overrides);
            await transaction.wait();
                let overrides2 = {
                    from: address,
                    value: BigNumber.from(value*10**6),
                }
            const transaction2 = await contract.buyTokensRound1(overrides2);
            await transaction2.wait()
        }
        catch(err) {
            console.log(err);
          }
    }

    async function buyTokensRound2 () {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);
        const usdc = new ethers.Contract(usdcAddress, ERC20.abi, signer);
        const usdcApproval = BigNumber.from(value2*10**6);

        try {
            let overrides = {
                from: address,
            }
        const transaction = await usdc.approve(ICOAddress, usdcApproval, overrides);
        await transaction.wait();
            let overrides2 = {
                from: address,
                value: ethers.utils.parseEther(value2),
            }
        const transaction2 = await contract.buyTokensRound2(overrides2);
        await transaction2.wait()
        }
        catch(err) {
            console.log(err);
        }
    }

    async function buyTokensRound3 () {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);
        const usdc = new ethers.Contract(usdcAddress, ERC20.abi, signer);
        const usdcApproval = BigNumber.from(value3*10**6);

        try {
            let overrides = {
                from: address,
            }
        const transaction = await usdc.approve(ICOAddress, usdcApproval, overrides);
        await transaction.wait();
            let overrides2 = {
                from: address,
                value: ethers.utils.parseEther(value3),
            }
        const transaction2 = await contract.buyTokensRound3(overrides2);
        await transaction2.wait()
        }
        catch(err) {
            console.log(err);
        }
    }

    async function withdrawTokensRound1() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);

        try {
            let overrides = {
                from: address
            }
            
            const transaction = await contract.withdrawTokensRound1(overrides);
            await transaction.wait();
        }
        catch(err) {
            console.log(err);
        }
    }

    async function withdrawTokensRound2() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);

        try {
            let overrides = {
                from: address
            }
            
            const transaction = await contract.withdrawTokensRound2(overrides);
            await transaction.wait();
        }
            catch(err) {
            console.log(err);
        }  
    }

    async function withdrawTokensRound3() {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ICOAddress, ICOABI.abi, signer);

        try {
            let overrides = {
                from: address
            }
            
            const transaction = await contract.withdrawTokensRound3(overrides);
            await transaction.wait();
        }
            catch(err) {
            console.log(err);
        }
    }


    return (
            <div className="App mx-20 my-10">
                <p className="text-base text-grey">
                    Wallet : {address.slice(0,5)+'...'+address.slice(38,42)}
                </p>
                <p className="text-base text-grey">
                    My Round1 balance : {data.balancesToken1} $DENAR
                </p>
                <p className="text-base text-grey">
                    My Round2 balance : {data.balancesToken2} $DENAR
                </p>
                <p className="text-base text-grey">
                    My Round3 balance : {data.balancesToken3} $DENAR
                </p>
                <h2 className="text-2xl text-white my-2">Buy $DENAR at the best price :</h2>

                <button type="button"
                        onClick={buyTokensRound1}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Buy {(data.rateRound1*value*10**6).toFixed(2)} $DENAR 
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
                            type="number" min={1} onChange={handleChange1} value={value}/> USDC           
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ data.tokenAmountRound1 } $DENAR</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { (data.hardcapRound1) }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (data.tokenAmountRound1*100/data.hardcapRound1) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={buyTokensRound2}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy {(data.rateRound2*value2*10**6).toFixed((2))} $DENAR
                </button><input type="number" min={1} onChange={handleChange2} value={value2}/> USDC
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ data.tokenAmountRound2 } $DENAR</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { data.hardcapRound2 }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (data.tokenAmountRound2*100/data.hardcapRound2) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={buyTokensRound3}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy {(data.rateRound3*value3*10**6).toFixed(2)} $DENAR
                </button><input type="number" min={1} onChange={handleChange3} value={value3}/> USDC
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ data.tokenAmountRound3 } $DENAR</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { data.hardcapRound3 }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (data.tokenAmountRound3*100/data.hardcapRound3) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={withdrawTokensRound1}
                        className="mt-4 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Claim {data.balancesToken1} $DENAR Round 1
                </button>
                <button type="button"
                        onClick={withdrawTokensRound2}
                        className="mt-4 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Claim {data.balancesToken2} $DENAR Round 2
                </button>
                <button type="button"
                        onClick={withdrawTokensRound3}
                        className="mt-4 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Claim {data.balancesToken3} $DENAR Round 3
                </button>
            </div>
    );

}
