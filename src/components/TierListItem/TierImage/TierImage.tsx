import React from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const TierImage = ({ item, tier }: any) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() =>
        navigate(`/${item.category_slug}/${item.template_slug}/${item.id}`)
      }
      className={`flex justify-center items-center bg-gray-100 rounded border border-gray-300 shadow-100 flex-col w-full cursor-pointer`}
    >
      <div
        className={`flex justify-start items-center w-full flex-col h-[140px] overflow-hidden md:h-[220px] xl:h-[170px]`}
        ref={tier}
      >
        <img
          src={item?.image}
          alt="tier_image"
          className="rounded object-contain w-full h-auto"
        />
      </div>

      <div className="flex justify-around items-start w-full p-2 bg-gray-100 rounded-b text-gray-900 divide-x divide-gray-300 border-t border-gray-300 text-center">
        <div className="flex flex-col justify-start items-center w-full">
          <span className="text-sm font-semibold break-all">
            Name : {item?.name}
          </span>
          <span className="text-sm font-semibold break-all">
            Description: {item?.description}
          </span>
        </div>
        <div className="flex justify-start items-center flex-col pl-2  w-full">
          <span className="text-sm font-semibold break-all">
            Template : {item?.template_name}
          </span>
          <span className="text-sm font-semibold">
            Date :{moment(item?.created_at).format("L")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TierImage
