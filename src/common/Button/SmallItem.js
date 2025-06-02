import { Link } from "react-router-dom"
const SmallItem = (props) => {
  const { menu } = props;
  return (
    <>
      <div
        className={`flex justify-center items-center w-[100px] h-[30px]   hover:bg-[#24242c] hover:rounded-lg`}>
        <Link
          to="/charts/token"
          className={`lg:text-base text-xs  font-medium ${menu === "token" ? "text-white" : "text-[#9f9fa8]"} hover:text-white text-[#9f9fa8]`}>Charts</Link>
      </div>
    </>
  )
}
export default SmallItem