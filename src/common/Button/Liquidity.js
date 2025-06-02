import { Link } from "react-router-dom";
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
const Liquidity = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`flex lg:px-4 px-2 lg:py-2  py-2 ${menu === "liquidity" ? "bg-[#3a4956] rounded-lg" : ""} `}>
        <Link
          to="/charts/liquidity"
          className={`lg:text-base text-xs  font-medium ${menu === "liquidity" ? "text-white" : "text-[#9f9fa8]"} hover:text-white text-[#9f9fa8]`}
        >Liquidity</Link>
        <div className="lg:w-[8px] w-[6px] flex items-start font-normal text-yellow-400">
          <MonetizationOnTwoToneIcon fontSize="6px" />
        </div>
      </div>
    </>
  )
}
export default Liquidity