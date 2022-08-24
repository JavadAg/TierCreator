import React, { RefObject, useRef } from "react"
import moment from "moment"
import { Tier } from "../../../types/tier.types"

interface IProps {
  item: Tier
  tier?: RefObject<HTMLDivElement>
}

const TierContainer: React.FC<IProps> = ({ item, tier }) => {
  return (
    <div
      className={`flex justify-center items-center border border-gray-300 shadow-100 flex-col max-w-[1200px] my-1 w-full `}
    >
      <div
        className={`flex justify-start items-center w-full flex-col overflow-hidden divide-y divide-gray-300`}
        ref={tier}
      >
        {item?.fieldsdetails?.labels.map((label: string, index: number) => (
          <div
            style={{ backgroundColor: `${item.fieldsdetails.fieldsbgcolor}` }}
            key={index}
            className={`flex justify-start items-center w-full relative min-h-[96px]`}
          >
            <span
              className={`break-all justify-center items-center flex border-r border-gray-200 p-1 text-md text-center max-w-[96px] w-full h-24`}
              style={{
                backgroundColor: item.fieldsdetails.colors[index]
              }}
            >
              {label}
            </span>
            <div className="flex justify-center items-center">
              {item.fieldsdetails.templateImages[index].map(
                (image: string, index: number) => (
                  <img
                    key={index}
                    className={`min-w-[96px] w-24 h-24 object-cover`}
                    src={image}
                    alt="tierimage"
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-around items-start w-full p-2 bg-gray-50  text-gray-900 divide-x divide-gray-300 border-t border-gray-300 text-center">
        <div className="flex flex-col justify-start items-center w-full">
          <span className="text-sm font-semibold break-all md:text-[.9rem]">
            Name : {item?.name}
          </span>
          <span className="text-sm font-semibold break-all md:text-[.9rem]">
            Description: {item?.description}
          </span>
        </div>
        <div className="flex justify-start items-center flex-col pl-2 w-full">
          <span className="text-sm font-semibold break-all md:text-[.9rem]">
            Template : {item?.template_name}
          </span>
          <span className="text-sm font-semibold md:text-[.9rem]">
            Date :{moment(item?.created_at).format("L")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TierContainer
