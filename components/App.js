import React from 'react';
import {ethers} from 'ethers';
import Contract from '../artifacts/contracts/ICO.sol/ICO.json'




const contractAddress = "0xc1c4518A10b109dAff1278058e0945C4Ed723b30"



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAccount: "0x00000000000000000000",
            contract: null,
            provider: null,
            hardcap: 0,
            tokenAmount: 0,
            balancesToken: 0,
        };
    }

    

    async componentDidMount() {
        await this.requestAccountAndDatas();
    }

    requestAccountAndDatas = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length !== 0) {
            this.setState({currentAccount: accounts[0]});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
            this.setState({contract: contract, provider: provider}, () => {this.requestDatas()});
        }
    }

    requestDatas = async () => {
        const hardcapRound1 = await this.state.contract.hardCapRound1();
        const hardcapRound2 = await this.state.contract.hardCapRound2();
        const hardcapRound3 = await this.state.contract.hardCapRound3();
        const tokenAmountRound1 =  await this.state.contract.tokenAmountRound1();
        const tokenAmountRound2 =  await this.state.contract.tokenAmountRound2();
        const tokenAmountRound3 =  await this.state.contract.tokenAmountRound3();
        const balancesToken =  await this.state.contract.getBalanceToken();
        const closingTimeRound1 = await this.state.contract.closingTimeRound1();
        this.setState({hardcapRound1: ethers.utils.formatEther(hardcapRound1),
            hardcapRound2: ethers.utils.formatEther(hardcapRound2),
            hardcapRound3: ethers.utils.formatEther(hardcapRound3),
            tokenAmountRound1: ethers.utils.formatEther(tokenAmountRound1),
            tokenAmountRound2: ethers.utils.formatEther(tokenAmountRound2),
            tokenAmountRound3: ethers.utils.formatEther(tokenAmountRound3),
            balancesToken: ethers.utils.formatEther(balancesToken),
            closingTimeRound1 : String(closingTimeRound1),
            
        });
    }
    
    buyTokensRound1 = async (amount) => {
        const data = await this.state.contract.buyTokensRound1({ value: ethers.utils.parseEther(amount) });
        this.state.provider.once(data.hash, (transaction) => {
            this.requestDatas();
        })
    }

    buyTokensRound2 = async (amount) => {
        const data = await this.state.contract.buyTokensRound2({ value: ethers.utils.parseEther(amount) });
        this.state.provider.once(data.hash, (transaction) => {
            this.requestDatas();
        })
    }

    buyTokensRound3 = async (amount) => {
        const data = await this.state.contract.buyTokensRound3({ value: ethers.utils.parseEther(amount) });
        this.state.provider.once(data.hash, (transaction) => {
            this.requestDatas();
        })
    }

    withdrawTokens = async () => {
        await this.state.contract.withdrawTokens();
    }

    render() {
        return (
            <div className="App mx-20 my-10">
                <p className="text-base text-grey">
                    Wallet : {this.state.currentAccount.slice(0,5)+'...'+this.state.currentAccount.slice(38,42)}
                </p>
                <p className="text-base text-grey">
                    My balance : {this.state.balancesToken} $TSAN
                </p>
                <h2 className="text-2xl text-white my-2">Buy $TSAN at the best price :</h2>

                <button type="button"
                        onClick={() => this.buyTokensRound1()}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Buy 212 500 $TSAN for 0.25 ETH
                        </button>               
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ this.state.tokenAmountRound1 } $TSAN</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { this.state.hardcapRound1 }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (this.state.tokenAmountRound1*100/this.state.hardcapRound1) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={() => this.buyTokensRound2("0.25")}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy 212 500 $TSAN for 0.25 ETH
                </button>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ this.state.tokenAmountRound2 } $TSAN</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { this.state.hardcapRound2 }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (this.state.tokenAmountRound2*100/this.state.hardcapRound2) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={() => this.buyTokensRound3("0.5")}
                        className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Buy 500 000 $TSAN for 0.5 ETH
                </button>
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">{ this.state.tokenAmountRound3 } $TSAN</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">HardCap : { this.state.hardcapRound3 }</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{width: (this.state.tokenAmountRound3*100/this.state.hardcapRound3) + "%"}}></div>
                </div>
                <button type="button"
                        onClick={() => this.withdrawTokens()}
                        className="mt-4 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Claim my $TSAN
                </button>
            </div>
        );
    
}}

export default App;
