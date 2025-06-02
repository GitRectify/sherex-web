import { Link } from "react-router-dom";
const TokenTables = (props) => {
    const { tokenData } = props;
    return (
        <div className="bg-white bg-opacity-20 text-white rounded-2xl px-6 py-4">
            {/* Table Headers */}
            <div className="flex items-center mt-4 px-4 py-2 border-b border-[#FFFFFF1A]">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">Name</p>
                </div>
                <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">Price</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm  font-medium text-gray-400">Price Change</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">Volume (24h)</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">TVL</p>
                </div>
                <div className="lg:hidden  flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400 truncate">Volume/TVL</p>
                </div>
            </div>

            {/* Table Row */}
            {tokenData.map((token) => (
                <Link
                    key={token.id}
                    to={`/tokens/${token.id}`}
                    className="flex items-center px-4 py-4 hover:bg-white cursor-pointer hover:bg-opacity-5 transition-colors"
                >
                    <div className="flex-1 flex flex-col items-start gap-2">
                        <div className="flex items-center gap-1">
                            <img src="/static/images/icons/USDC.png" className="w-6 h-6 rounded-full" alt={token.symbol} />
                            <div>
                                <span className="text-white font-medium">{token.name}</span>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-xl px-1 py-[1px] ml-8">
                            <span className="text-white text-sm">{token.symbol}</span>
                        </div>
                    </div>

                    <div className="lg:block hidden flex-1 text-right">
                        <p className="text-white">
                            ${token.price ? Number(token.price)?.toFixed(2) : "1.00"}
                        </p>
                    </div>

                    <div className="lg:hidden flex-1 text-right">
                        <p className="text-white">
                            ${token.price ? Number(token.price)?.toFixed(2) : "1.00"}
                        </p>
                        <p className="text-[#53F3C3]">{token.priceChange ? Number(token.priceChange)?.toFixed(2) : "1.00"}%
                        </p>
                    </div>

                    <div className="hidden lg:block lg:flex-1 text-right">
                        <p className="text-[#53F3C3]">{token.priceChange ? Number(token.priceChange)?.toFixed(2) : "1.00"}%</p>
                    </div>

                    <div className="hidden lg:block flex-1 text-right">
                        <p className="text-white">${token.volume ? Number(token.volume)?.toFixed(2) : "1.00"}</p>
                    </div>

                    <div className="hidden lg:block flex-1 text-right">
                        <p className="text-white">${token?.totalValueLocked ? token.totalValueLocked : "1.00"}</p>
                    </div>

                    <div className="lg:hidden flex-1 text-right">
                        <p className="text-white">${token.volume ? Number(token.volume) : "1.00"}%</p>
                        <p className="text-white">${token.totalValueLocked ? token.totalValueLocked : "1.00"}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TokenTables;