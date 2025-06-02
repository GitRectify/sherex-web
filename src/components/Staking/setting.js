import ChartSwapHeader from "../Charts/ChaertSwapHeader";

const StakingSetting = ({ info, setInfo, liquiditySlippage, handleSetting }) => {  // Receive handleSetting as prop
  return (
    <div className="lg:w-2/5 w-full justify-center items-center lg:pl-10 order-1 lg:order-2">
      <div className="flex flex-col px-10 py-4 rounded-xl h-full border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
        <ChartSwapHeader 
          isSetting="false"
          info = {info}
          setInfo = {setInfo}
          liquiditySlippage = {liquiditySlippage}
          handleSetting={handleSetting}
        />
      </div>
    </div>
  );
};

export default StakingSetting;