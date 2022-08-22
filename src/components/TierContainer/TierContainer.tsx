import React from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { itemsEqual } from "@dnd-kit/sortable/dist/utilities"

const TierContainer = ({ item, isDashboard, tier }: any) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() =>
        isDashboard
          ? navigate(
              `/${item.category_slug}/${item.template_slug}/${item.id}`,
              { state: item }
            )
          : undefined
      }
      className={`flex justify-center items-center bg-customgrey-100 rounded border border-customgrey-300 shadow-200 flex-col max-w-[600px] my-1 w-full ${
        isDashboard && "cursor-pointer max-w-[400px]"
      }`}
    >
      <div
        className={`flex justify-start items-center w-full flex-col h-[100px] overflow-hidden`}
        ref={tier}
      >
        <img
          src={item?.image}
          alt="tier_image"
          className="rounded object-contain w-full h-auto"
        />
        {/* {item?.fieldsdetails?.labels.map((label: any, index: number) => (
          <div
            key={index}
            className={`flex justify-start items-center w-full ${
              isDashboard && "w-[400px]"
            }`}
          >
            <span
              className={`flex justify-center items-center w-24 h-24 text-center  ${
                isDashboard && "text-xs w-16 h-16"
              }`}
              style={{
                backgroundColor: item.fieldsdetails.colors[index]
              }}
            >
              {label}
            </span>
            <div className="flex justify-center items-center">
              {item.fieldsdetails.templateImages[index].map(
                (image: any, index: number) => (
                  <img
                    key={index}
                    className={`w-24 h-24 object-cover ${
                      isDashboard && "w-16 h-16"
                    }`}
                    src={image}
                    alt="tierimage"
                  />
                )
              )}
            </div>
          </div>
        ))} */}
      </div>

      <div className="flex justify-around items-start w-full p-2 bg-indigo-100 rounded-b text-customgrey-600 divide-x divide-customgrey-400 border-t border-customgrey-300 text-center">
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

export default TierContainer
