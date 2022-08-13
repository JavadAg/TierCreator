import React from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const TierContainer = ({ item, isDashboard }: any) => {
  const navigate = useNavigate()
  console.log(isDashboard)
  return (
    <div
      onClick={() =>
        isDashboard
          ? navigate(
              `/${item.category_slug}/${item.template_slug}/${item.id}`,
              {
                state: item
              }
            )
          : undefined
      }
      className={`flex justify-center items-center bg-red-100 flex-col max-w-[1200px] m-2 w-full ${
        isDashboard && "cursor-pointer max-w-[400px]"
      }`}
    >
      <div className="flex justify-center items-center flex-col">
        <span>Name : {item.name}</span>
        <span>Description: {item.description}</span>
      </div>
      <div className="flex justify-center items-center flex-col">
        <span>Template Name : {item.template_name}</span>
        <span>Category Name : {item.category_name}</span>
        <span>{moment(item.created_at).format("L")}</span>
      </div>
      {item.fieldsdetails.labels.map((label: any, index: number) => (
        <div
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
            {item.fieldsdetails.templateImages[index].map((image: any) => (
              <img
                className={`w-24 h-24 object-cover ${
                  isDashboard && "w-16 h-16"
                }`}
                src={image}
                alt="tierimage"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TierContainer
