import { Link } from "react-router-dom"
import { useState } from "react";
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
const Volume = (props) => {
  const { menu } = props;
  const vol = document.getElementById("vol");
  const [isActive, setIsActive] = useState(false)
  if (vol) {
    vol.addEventListener("mouseenter", () => {
      setIsActive(true);
    })
    vol.addEventListener("mouseleave", () => {
      setIsActive(false);
    })
  }
  return (
    <>
      <div
        id="vol"
        className={`flex lg:px-4 px-2 lg:py-2  py-2 ${menu === "volume" ? "bg-[#3a4956] rounded-lg" : ""} `}>
        <Link
          to="/charts/volume"
          className={`lg:text-base text-xs  font-medium ${menu === "volume" ? "text-white" : "text-[#9f9fa8]"} hover:text-white`}
        >Quantum Analysis</Link>
        <div className="lg:w-[8px] w-[6px] flex items-start font-normal text-yellow-400">
          <MonetizationOnTwoToneIcon fontSize="6px" />
        </div>

      </div>
    </>
  )
}
export default Volume