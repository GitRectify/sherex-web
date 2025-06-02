import { useDispatch, useSelector } from "react-redux";
import TokenTables from "../../components/token/TokenTables";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
const Tokens = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { tokens, loading } = useSelector((state) => state.tokens);

    return (
        <div className="flex w-full justify-center">
            <div
                className="pt-28 max-sm:px-4  max-[1390px]:px-10 pb-40 w-[1290px] flex flex-col relative"
            >
                <div className="mb-5">
                    <div className="flex md:flex-row flex-col justify-between w-full">
                        <p className=" text-2xl font-bold" style={{
                            backgroundImage: 'linear-gradient(to right, #F3BA2F, #CF7D33)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {t("tokenTable.allTokens")}
                        </p>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder={t("nav.search")}
                                className="bg-[#FFFFFF] bg-opacity-20 text-white pl-10 pr-4 py-1 rounded-2xl border border-white focus:outline-none focus:border-[#F3BA2F] w-[300px]"
                            />
                            <img
                                src="/static/images/icons/search.svg"
                                className="absolute left-3 w-4 h-4"
                                alt="search"
                            />
                        </div>
                    </div>
                </div>{
                    loading ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <ClipLoader
                                color="#F3BA2F"
                                loading={loading}
                                size={50}
                                aria-label="Loading Spinner"
                            />
                        </div>
                    ) : (
                        <TokenTables tokenData={tokens} />
                    )
                }
            </div >
        </div>
    )
}

export default Tokens;