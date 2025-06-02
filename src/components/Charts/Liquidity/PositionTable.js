import { useState } from "react"
import { getTokenLogo } from "../../../utils";
import { formatUnits } from "ethers";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";

const PositionTable = ({ positions, stakedPositions, isMasterChefPool, token0, token1 }) => {
  const { stakePosition, harvestPosition } = useActions();
  
  const handleStake = async (positionId) => {
    try {
      const success = await stakePosition(positionId);
      if (success) {
        toast.success('Position staked successfully');
      }
    }
    catch (error) {
      toast.error('Stake position failed:', error);
    }
  }

  const handleHarvest = async (positionId) => {
    try {
      const success = await harvestPosition(positionId);
      if (success) {
        toast.success('Position harvested successfully');
      }
    }
    catch (error) {
      toast.error('Harvest position failed:', error);
    }
  }

  return (
    <div className="text-white rounded-2xl px-4 sm:px-6 py-4 border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
      <div className="mt-4">
        <p className="text-white text-opacity-80 font-semibold">Your Position</p>
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-transparent shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-transparent text-white">
                        <th className="py-2 px-4 text-left">Position ID</th>
                        <th className="py-2 px-4 text-center">{token0.symbol} Amount</th>
                        <th className="py-2 px-4 text-center">{token1.symbol} Amount</th>
                        <th className="py-2 px-4 text-center">Liquidity</th>
                        <th className="py-2 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      (!isMasterChefPool || (positions && positions.length === 0 && stakedPositions && stakedPositions.length === 0)) && (
                        <tr>
                          <td colSpan="5" className="py-2 px-4 text-center">{!isMasterChefPool ? "No MasterChef Pool Found" : "No Positions Found"}</td>
                        </tr>
                      )
                    }
                    {positions && positions.map((position) => (
                        <tr key={position.id} className="border-b border-gray-700 bg-transparent bg-opacity-30 hover:bg-opacity-50 transition">
                            <td className="py-2 px-4 text-left">{position.id}</td>
                            <td className="py-2 px-4 text-center">{parseFloat(position.depositedToken0).toFixed(4)}</td>
                            <td className="py-2 px-4 text-center">{parseFloat(position.depositedToken1).toFixed(4)}</td>
                            <td className="py-2 px-4 text-center">${parseFloat(formatUnits(position.liquidity, 18)).toFixed(2)}</td>
                            <td className="py-2 px-4 text-right flex justify-end">
                              <div className="flex justify-center w-[100px] text-black items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3 truncate"
                                  onClick={() => handleStake(position.id)}
                              >
                                  Stake
                              </div>
                            </td>
                        </tr>
                    ))}
                    {stakedPositions && stakedPositions.map((position) => (
                        <tr key={position.id} className="border-b border-gray-700 bg-transparent bg-opacity-30 hover:bg-opacity-50 transition">
                            <td className="py-2 px-4 text-left">{position.id}</td>
                            <td className="py-2 px-4 text-center"></td>
                            <td className="py-2 px-4 text-center"></td>
                            <td className="py-2 px-4 text-center">{position.liquidity}</td>
                            <td className="py-2 px-4 text-right flex justify-end">
                              <div className="flex justify-center w-[100px] text-black items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3 truncate"
                                  onClick={() => handleHarvest(position.id)}
                              >
                                  Harvest
                              </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div >
  )
}

export default PositionTable