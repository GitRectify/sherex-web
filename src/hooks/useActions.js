import { useState, useEffect } from "react";
import { contractAddresses, SHRX_TOKEN, WETH_ADDRESS } from "../constants";
import { useAppKitProvider, useAppKitAccount} from '@reown/appkit/react';
import { BrowserProvider, JsonRpcProvider, Contract, formatUnits, toBigInt } from "ethers";
import NonfungiblePositionManagerAbi from "../abis/NonfungiblePositionManager.json";
import ERC20Abi from "../abis/ERC20.json";
import WBNBAbi from "../abis/WBNB.json";
import SwapRouterAbi from "../abis/SwapRouter.json";
import StakingFactoryAbi from "../abis/StakingFactoryAbi.json";
import StakingPoolAbi from "../abis/StakingPool.json";
import QuoterV2Abi from '../abis/QuoterV2.json';
import SherexStakingAbi from '../abis/SherexStaking.json'
import MasterChefV3Abi from '../abis/MasterChefV3.json'
import { TREASURY_ADDRESS, RPC_URL, STAKING_ADDRESS } from "../constants";

export const useActions = () => {
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('eip155');

    const approveToken = async (tokenAddress, spender, amount) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const tokenContract = new Contract(tokenAddress, ERC20Abi, signer);
            const approveTx = await tokenContract.approve(spender, amount);
            await approveTx.wait();
            return true;
        } catch (error) {
            console.error('Token approval failed:', error);
            return false;
        }
    }

    const getDecimals = async (tokenAddress) => {
        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const tokenContract = new Contract(tokenAddress, ERC20Abi, ethersProvider);
            const decimals = await tokenContract.decimals();
            return decimals;
        }
        catch (err) {
            return 0;
        }
    }

    const getSymbol = async (tokenAddress) => {
        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const tokenContract = new Contract(tokenAddress, ERC20Abi, ethersProvider);
            const symbol = await tokenContract.symbol();
            return symbol;
        }
        catch (err) {
            return 0;
        }
    }

    const getName = async (tokenAddress) => {
        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const tokenContract = new Contract(tokenAddress, ERC20Abi, ethersProvider);
            const name = await tokenContract.name();
            return name;
        }
        catch (err) {
            return 0;
        }
    }

    const getBalance = async (tokenAddress) => {
        if (!isConnected) return 0;
        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const tokenContract = new Contract(tokenAddress, ERC20Abi, ethersProvider);
            const balance = await tokenContract.balanceOf(address);
    
            const decimals = await getDecimals(tokenAddress);
            const formattedBalance = formatUnits(balance, decimals);
            return formattedBalance;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    }

    const getNativeBalance = async () => {
        if (!isConnected) return 0;
        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const balance = await ethersProvider.getBalance(address);

            const formattedBalance = formatUnits(balance, 18);
            return formattedBalance;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    }

    const depositWBNB = async (amount) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const wbnbContract = new Contract(WETH_ADDRESS, WBNBAbi, signer);
            const depositTx = await wbnbContract.deposit({ value: amount });
            await depositTx.wait();
            return true;
        } catch (error) {
            console.error('WBNB deposit failed:', error);
            return false;
        }
    }

    const withdrawWBNB = async (amount) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const wbnbContract = new Contract(WETH_ADDRESS, WBNBAbi, signer);
            const withdrawTx = await wbnbContract.withdraw(amount);
            await withdrawTx.wait();
            return true;
        } catch (error) {
            console.error('WBNB withdrawal failed:', error);
            return false;
        }
    }   

    const addLiquidity = async (token0, token1, fee, tickLower, tickUpper, amount0, amount1, sqrtPriceX96) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();

            const nonfungiblePositionManager = new Contract(
                contractAddresses.nonfungiblePositionManager, 
                NonfungiblePositionManagerAbi, 
                signer
            );

            // Ensure tokens are in the correct order
            const [tokenA, tokenB] = token0 < token1 ? [token0, token1] : [token1, token0];
            const [amountA, amountB] = token0 < token1 ? [amount0, amount1] : [amount1, amount0];

            // Initialize pool if necessary
            const poolTx = await nonfungiblePositionManager.createAndInitializePoolIfNecessary(
                tokenA,
                tokenB,
                fee,
                sqrtPriceX96.toString()
            );
            await poolTx.wait();

            // Get deadline (30 minutes from now)
            const blockNumber = await ethersProvider.getBlockNumber();
            const block = await ethersProvider.getBlock(blockNumber);
            const deadline = block.timestamp + 1800; // 30 minutes

            console.log(tickLower)
            console.log(tickUpper);

            // Mint position
            const mintParams = [
                tokenA,          // token0
                tokenB,          // token1
                fee,            // fee
                tickLower.toString(),      // tickLower
                tickUpper.toString(),      // tickUpper
                amountA,        // amount0Desired
                amountB,        // amount1Desired
                0,              // amount0Min
                0,              // amount1Min
                address,        // recipient
                deadline       // deadline
            ];

            const mintTx = await nonfungiblePositionManager.mint(mintParams);
            const receipt = await mintTx.wait();

            // const tokenId = receipt.logs[4].topics[1];
            // const approveTx = await nonfungiblePositionManager.approve(contractAddresses.masterChefV3, tokenId);
            // await approveTx.wait();
            // const rewardTx = await nonfungiblePositionManager.safeTransferFrom(address, contractAddresses.masterChefV3, tokenId);
            // await rewardTx.wait();
            
            return true;
        } catch (error) {
            console.error('Add liquidity failed:', error);
            throw error; // Re-throw to handle in the component
        } 
    }

    const addPoolToMasterChef = async (poolId, allocPoint, withUpdate) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const masterChefV3 = new Contract(contractAddresses.masterChefV3, MasterChefV3Abi, signer);
            const addTx = await masterChefV3.add(allocPoint, poolId, withUpdate);
            await addTx.wait();

            return true;
        }
        catch (error) {
            console.error('Adding Pool to MasterChef failed:', error);
            throw error;
        }
    }

    const stakePosition = async (positionId) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const nonfungiblePositionManager = new Contract(contractAddresses.nonfungiblePositionManager, NonfungiblePositionManagerAbi, signer);
            const approveTx = await nonfungiblePositionManager.approve(contractAddresses.masterChefV3, positionId);
            await approveTx.wait();

            const stakeTx = await nonfungiblePositionManager.safeTransferFrom(address, contractAddresses.masterChefV3, positionId);
            await stakeTx.wait();
            return true;
        }
        catch (error) {
            console.error('Staking position failed:', error);
            return false;
        }
    }

    const harvestPosition = async (positionId) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();    
            const masterChefV3 = new Contract(contractAddresses.masterChefV3, MasterChefV3Abi, signer);
            const harvestTx = await masterChefV3.harvest(positionId, address);
            await harvestTx.wait();
            return true;
        }
        catch (error) { 
            console.error('Harvesting position failed:', error);
            return false;
        }
    }

    const createStakingPool = async (token, rewardAmount, apys, lockPeriods) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const stakingFactory = new Contract(contractAddresses.stakingFactory, StakingFactoryAbi, signer);
            const approveTx = await approveToken(token, contractAddresses.stakingFactory, rewardAmount);

            const createTx = await stakingFactory.createStakingPool(token, rewardAmount, apys, lockPeriods, TREASURY_ADDRESS);
            await createTx.wait();
            return true;


        } catch (error) {
            console.error('Create staking pool failed:', error);
            throw error;
        }
    }

    const stake = async (poolAddress, stakingToken, amount, apyIndex) => {
        if (!isConnected) return;


        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const stakingPool = new Contract(poolAddress, StakingPoolAbi, signer);
            const approveTx = await approveToken(stakingToken, poolAddress, amount);
            const stakeTx = await stakingPool.stake(amount, apyIndex);
            await stakeTx.wait();
            return true;


        } catch (error) {
            console.error('Stake failed:', error);
            return false;
        }
    }

    const stakeSherex = async (amount, lockPeriod) => {
        if (!isConnected) return;


        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const stakingPool = new Contract(STAKING_ADDRESS, SherexStakingAbi, signer);
            await approveToken(SHRX_TOKEN.address, STAKING_ADDRESS, amount);
            const stakeTx = await stakingPool.stake(amount, lockPeriod * 86400);
            await stakeTx.wait();
            return true;


        } catch (error) {
            console.error('Stake failed:', error);
            return false;
        }
    }

    const quote = async (tokenIn, tokenOut, feeTier, amountIn) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const quoterV2 = new Contract(contractAddresses.quoterV2, QuoterV2Abi, ethersProvider);

            const quoteParams = {
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                amountIn: amountIn,
                fee: feeTier,
                sqrtPriceLimitX96: 0
            }
            const result = await quoterV2.quoteExactInputSingle.staticCall(quoteParams);

            return result.amountOut;
        } catch (error) {
            console.error("Error fetching quote: ", error);
            return false;
        }
    }

    const getRemainingStakingTokens = async () => {
        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const sherexStakingContract = new Contract(STAKING_ADDRESS, SherexStakingAbi, ethersProvider);
            const remainingStakingTokens = await sherexStakingContract.remainingStakingTokens();

            const sherexContract = new Contract(SHRX_TOKEN.address, ERC20Abi, ethersProvider);
            const totalStaked = await sherexContract.balanceOf(STAKING_ADDRESS); 

            return { remainRewards: remainingStakingTokens, totalStaked: totalStaked };
        } catch (error) {
            console.error("Error fetching tokens: ", error);
            return false;
        }
    }

    const swap = async (tokenIn, tokenOut, feeTier, amountIn) => {
        if (!isConnected) return;

        try {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const swapRouter = new Contract(contractAddresses.swapRouter, SwapRouterAbi, signer);
            
            // Get deadline (30 minutes from now)
            const blockNumber = await ethersProvider.getBlockNumber();
            const block = await ethersProvider.getBlock(blockNumber);
            const deadline = block.timestamp + 1800; // 30 minutes

            const swapParams = {
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: feeTier,
                recipient: address,
                deadline: deadline,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            }
            const swapTx = await swapRouter.exactInputSingle(swapParams);
            await swapTx.wait();
            return true;
        } catch (error) {
            console.error('Swap failed:', error);
            return false;
        }
    }

    return { approveToken, addLiquidity, depositWBNB, withdrawWBNB, swap, quote, createStakingPool, addPoolToMasterChef, stake, getName, getDecimals, getSymbol, getRemainingStakingTokens, stakeSherex, getBalance, getNativeBalance, stakePosition, harvestPosition };
};

