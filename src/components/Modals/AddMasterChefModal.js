import { useState, useEffect } from "react";
import { formatAddress } from "../../utils";
import { useTranslation } from "react-i18next";
import { useActions } from "../../hooks/useActions";
import { toast } from "react-toastify";

const AddMasterChefModal = ({ poolId, totalAllocPoint }) => {
    const [allocPoint, setAllocPoint] = useState(30);
    const { addPoolToMasterChef } = useActions();
    const { t } = useTranslation();

    const handleAdd = async () => {
        try {
            if (!allocPoint) {
                toast.error("Alloc Point is 0");
                return;
            }

            await addPoolToMasterChef(poolId, allocPoint, true);
        }
        catch (err) {
            console.log(err);
            toast.error(t(`addToMasterChefModal.error.addPoolFailed`), {
                position: "top-left",
                zIndex: 1000,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                rtl: true
            });
        }
    }

    const handleAllocPoint = (e) => {
        let strValue = e.target.value;
        // let match = strValue.match(/\d+(\.\d*)?/);
        // let value = match ? match[0] : "";
        setAllocPoint(parseInt(strValue));
    }

    return (
        <div className="mb-6">
            <div className="flex w-full justify-between items-center">
                <div className="text-white mb-4">{t("addToMasterChefModal.totalAllocPoint")}</div>
                <div className="text-white mb-4">{totalAllocPoint}</div>
            </div>
            <div className="flex w-full justify-between items-center">
                <div className="text-white mb-4">{t("addToMasterChefModal.address")}</div>
                <div className="text-white mb-4">{formatAddress(poolId)}</div>
            </div>
            <div className="flex w-full justify-between items-center">
                <div className="text-white mb-4 w-full">{t("addToMasterChefModal.allocPoint")}</div>
            </div>
            <div className="flex gap-2 items-center justify-between max-md:flex-wrap">
                <input
                    type="number"
                    value={allocPoint}
                    onChange={handleAllocPoint}
                    className={`py-2 rounded-lg border transition-all w-full border-white text-center bg-transparent border-opacity-20 text-white hover:opacity-70`}
                >
                </input>
            </div>
            <button className=" bg-black hover:bg-opacity-60 mt-6 bg-opacity-40 rounded-xl py-3 w-[400px]" onClick={handleAdd}>{t("addToMasterChefModal.addPool")}</button>
        </div>
    );
};

export default AddMasterChefModal;
