import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from 'graphql-request'
import { GET_TOKENS, GET_POOLS, GET_SWAPS, GET_STAKING_POOLS, GET_BUNDLES, GET_MASTERCHEF, GET_POSITIONS } from "../queries";
import { setTokens, setLoading as setTokensLoading, setError as setTokensError } from "../store/slices/tokens";
import { setSwaps, setLoading as setSwapsLoading, setError as setSwapsError } from '../store/slices/swaps';
import { setPools, setLoading as setPoolsLoading, setError as setPoolsError } from '../store/slices/pools';
import { setPositions, setLoading as setPositionsLoading, setError as setPositionsError } from '../store/slices/positions';
import { setBundle, setLoading as setBundleLoading, setError as setBundleError } from "../store/slices/bundle";
import { setStakingPools, setLoading as setStakingPoolsLoading, setError as setStakingPoolsError } from "../store/slices/staking";
import { setMasterChef, setMasterChefPools, setUserPositions, setLoading as setMasterchefLoading, setError as setMasterChefError } from '../store/slices/masterchef';
import { USDC_ADDRESS, GraphQL_URL, STAKING_GRAPHQL_URL, MasterChefV3_GRAPHQL_URL, SHRX_STAKING_TOTAL, SHRX_TOKEN, STAKING_ADDRESS, testStakingPools, contractAddresses, RPC_URL } from "../constants";
import { formatUnits, JsonRpcProvider, Contract } from "ethers";
import MasterChefV3ABI from '../abis/MasterChefV3.json';
import { useActions } from "../hooks/useActions";

export const statisticsContext = createContext(null);

export const StatisticsProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { ethPriceInUSD } = useSelector((state) => state.bundle);
    const { tokens } = useSelector((state) => state.tokens);
    const { getRemainingStakingTokens, getDecimals, getSymbol } = useActions();

    useEffect(() => {
        const fetchBundle = async () => {
            dispatch(setBundleLoading(true));
            try {
                const result = await request(GraphQL_URL, GET_BUNDLES);
                const price = result.bundles[0].ethPriceUSD;
                dispatch(setBundle(price));
            } catch (error) {
                dispatch(setBundleError(error.message));
            } finally {
                dispatch(setBundleLoading(false));
            }
        };
        fetchBundle();
    }, [dispatch]);

    useEffect(() => {
        const fetchTokens = async () => {
            dispatch(setTokensLoading(true));
            try {
                const result = await request(GraphQL_URL, GET_TOKENS);
                const tokenList = result.tokens.map((token) => {
                    let tokenPrice = token.derivedETH * ethPriceInUSD;

                    return {
                        ...token,
                        price: tokenPrice,
                        volume: token.volume * tokenPrice,
                        totalValueLocked: token?.totalValueLocked * tokenPrice
                    }
                })
                dispatch(setTokens(tokenList));
            } catch (error) {
                dispatch(setTokensError(error.message));
            } finally {
                dispatch(setTokensLoading(false));
            }
        };
        fetchTokens();
    }, [dispatch, ethPriceInUSD]);

    useEffect(() => {
        const fetchPools = async () => {
            dispatch(setPoolsLoading(true));
            try {
                const result = await request(GraphQL_URL, GET_POOLS);
                const poolList = result.pools.map((pool) => {
                    const token0Price = tokens.find((token) => token.id == pool.token0.id).price;
                    const token1Price = tokens.find((token) => token.id == pool.token1.id).price;
                    const volume = pool.volumeToken0 * token0Price + pool.volumeToken1 * token1Price;
                    const collectedFees = pool.collectedFeesToken0 * token0Price + pool.collectedFeesToken1 * token1Price;
                    const liquidity = pool.totalValueLockedToken0 * token0Price + pool.totalValueLockedToken1 * token1Price;
                    return {
                        ...pool,
                        liquidity: liquidity,
                        volume: volume,
                        collectedFees: collectedFees
                    }
                })
                dispatch(setPools(poolList));
            } catch (error) {
                dispatch(setPoolsError(error.message));
            } finally {
                dispatch(setPoolsLoading(false));
            }
        };
        fetchPools();
    }, [dispatch, tokens]);

    useEffect(() => {
        const fetchPositions = async () => {
            dispatch(setPositionsLoading(true));
            try {
                const result = await request(GraphQL_URL, GET_POSITIONS);
                const positionList = result.positions.map((position) => {
                    const token0Price = tokens.find((token) => token.id == position.token0.id).price;
                    const token1Price = tokens.find((token) => token.id == position.token1.id).price;

                    const volume = token0Price * position.depositedToken0 + token1Price * position.depositedToken1;

                    return {
                        ...position,
                        volume: volume,
                    }
                })
                dispatch(setPositions(positionList));
            }
            catch (error) {
                dispatch(setPositionsError(error.message));
            }
            finally {
                dispatch(setPositionsLoading(false));
            }
        }
        fetchPositions();
    }, [dispatch, tokens])

    useEffect(() => {
        const getSherexStakingPool = async () => {
            const pool = {
                id: STAKING_ADDRESS,
                apys: [30, 100, 230, 400],
                lockPeriods: [180, 360, 720, 1080],
                apy: 30,
                lockPeriod: 180,
                rewards: 0,
                staked: 0,
                liquidity: 0,
                stakingToken: SHRX_TOKEN.address,
                stakingTokenSymbol: SHRX_TOKEN.symbol,
                rewardToken: SHRX_TOKEN.address,
                rewardTokenSymbol: SHRX_TOKEN.symbol
            };

            const stakingTokenPrice = tokens.find((token) => token.id == SHRX_TOKEN.address)?.price || 0;

            const { remainRewards, totalStaked } = await getRemainingStakingTokens();
            const formattedRemainingRewards = formatUnits(remainRewards, SHRX_TOKEN.decimals);
            const formattedTotalStaked = formatUnits(totalStaked, SHRX_TOKEN.decimals);

            const liquidity = formattedTotalStaked * stakingTokenPrice;

            pool.rewards = formattedRemainingRewards;
            pool.staked = formattedTotalStaked;
            pool.liquidity = liquidity;

            return pool;
        }
        const fetchStakingPools = async () => {
            dispatch(setStakingPoolsLoading(true));
            const stakingPoolList = [];
            const sherexStakingPool = await getSherexStakingPool();
            stakingPoolList.push(sherexStakingPool);
            try {
                const result = await request(STAKING_GRAPHQL_URL, GET_STAKING_POOLS);

                for (const pool of result.stakingPools) {
                    const stakingTokenPrice = tokens.find((token) => token.id == pool.stakingToken)?.price || 0;
                    const rewardTokenPrice = tokens.find((token) => token.id == pool.rewardToken)?.price || 0;
                    const stakingTokenDecimals = await getDecimals(pool.stakingToken);
                    const rewardTokenDecimals = await getDecimals(pool.rewardToken);
                    const stakingTokenSymbol = await getSymbol(pool.stakingToken);
                    const rewardTokenSymbol = await getSymbol(pool.rewardToken);
                    const totalStaked = formatUnits(pool.totalStaked, stakingTokenDecimals);

                    if (testStakingPools.includes(pool.poolAddress)) continue;

                    const remainingRewards = formatUnits(pool.remainingRewards, rewardTokenDecimals);
                    const liquidity = totalStaked * stakingTokenPrice + remainingRewards * rewardTokenPrice;

                    stakingPoolList.push({
                        ...pool,
                        liquidity: liquidity.toFixed(4),
                        apy: pool.apys[0],
                        lockPeriod: pool.lockPeriods[0],
                        staked: totalStaked,
                        rewards: remainingRewards,
                        stakingTokenSymbol: stakingTokenSymbol,
                        rewardTokenSymbol: rewardTokenSymbol
                    })
                }

                dispatch(setStakingPools(stakingPoolList));
            } catch (err) {
                // dispatch(setStakingPoolsError(error.message));
                console.log(err);
                dispatch(setStakingPools(stakingPoolList));
            } finally {
                dispatch(setStakingPoolsLoading(false));
            }
        };
        fetchStakingPools();
    }, [dispatch, tokens]);

    useEffect(() => {
        const fetchSwaps = async () => {
            dispatch(setSwapsLoading(true));
            try {
                const timestamp = parseInt(((new Date()).getTime()) / 1000 - 31536000);
                const result = await request(GraphQL_URL, GET_SWAPS, { timestamp: timestamp });
                const swapsList = result.swaps.map((swap) => {
                    const token0Price = tokens.find((token) => token.id == swap.token0.id)?.price || 0;
                    const token1Price = tokens.find((token) => token.id == swap.token1.id)?.price || 0;
                    
                    const liquidity = swap.poolToken0Locked * token0Price + swap.poolToken1Locked * token1Price;
                    const token0Locked = swap.totalValueLockedToken0 * token0Price;
                    const token1Locked = swap.totalValueLockedToken1 * token1Price;
                    return {
                        ...swap,
                        liquidity: liquidity,
                        token0Locked: token0Locked,
                        token1Locked: token1Locked
                    }
                })
                dispatch(setSwaps(swapsList));
            } catch (error) {
                dispatch(setSwapsError(error.message));
            } finally {
                dispatch(setSwapsLoading(false));
            }
        };
        fetchSwaps();
    }, [dispatch, tokens]);

    useEffect(() => {
        const fetchMasterChef = async () => {
            dispatch(setMasterchefLoading(true));
            try {
                const result = await request(MasterChefV3_GRAPHQL_URL, GET_MASTERCHEF);
                if (!result.masterChefs || !result.masterChefs.length || !result.pools || !result.userPositions) return;

                const masterChef = result.masterChefs[0];
                const masterChefPools = result.pools;
                const userPositions = result.userPositions;
                const owner = await fetchMasterChefV3Owner();
                masterChef.owner = owner;
                
                dispatch(setMasterChef(masterChef));
                dispatch(setMasterChefPools(masterChefPools));                
                dispatch(setUserPositions(userPositions));
            }
            catch (error) {
                dispatch(setMasterChefError(error.message));
            }
            finally {
                dispatch(setMasterchefLoading(false));
            }
        }
        fetchMasterChef();
    }, [dispatch])

    const fetchMasterChefV3Owner = async () => {
        try {
            const ethersProvider = new JsonRpcProvider(RPC_URL);
            const masterChefV3Contract = new Contract(contractAddresses.masterChefV3, MasterChefV3ABI, ethersProvider);

            const owner = await masterChefV3Contract.owner();
            return owner;
        }
        catch (error) {
            console.log(error);
            return 0;
        }
    }

    return <statisticsContext.Provider value={{}}>{children}</statisticsContext.Provider>
}

export const useStatisticsData = () => {
    const context = useContext(statisticsContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}