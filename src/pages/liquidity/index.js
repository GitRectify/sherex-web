import { useDispatch, useSelector } from "react-redux";
import LiquidityTable from "../../components/Liquidity/table";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
const Liquidity = () => {

    const { pools, loading: poolsLoading } = useSelector((state) => state.pools);
    const { tokens, loading: tokensLoading } = useSelector((state) => state.tokens);
    const { masterChef, pools: masterChefPools, loading: masterChefPoolsLoading } = useSelector((state) => state.masterChef);
    const { t } = useTranslation();

    return (
        <div className="flex justify-center w-full">
            <div
                className="pt-28 pb-40 min-[1360px]:px-0 lg:px-8 px-4 flex flex-col relative w-[1290px]"
            >
                <div className="mb-5">
                    <p className=" text-4xl font-bold" style={{
                        backgroundImage: 'linear-gradient(to right, #F3BA2F, #CF7D33)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t("liquidityTable.title")}
                    </p>
                    <p className="text-white text-base">
                        {t("liquidityTable.subtitle")}
                    </p>
                </div>
                {poolsLoading || tokensLoading || masterChefPoolsLoading ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <ClipLoader
                            color="#F3BA2F"
                            loading={poolsLoading || tokensLoading || masterChefPoolsLoading}
                            size={50}
                            aria-label="Loading Spinner"
                        />
                    </div>
                ) : (
                    <LiquidityTable tokens={tokens} pools={pools} masterChefPools={masterChefPools} masterChef={masterChef}/>

                )}
            </div >
        </div>
    )
}

export default Liquidity;