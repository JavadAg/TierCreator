import moment from "moment"

const TierContainer = ({ item, tier }: any) => {
  return (
    <div
      className={`flex justify-center items-center bg-customgrey-100 border border-customgrey-300 shadow-200 flex-col max-w-[600px] my-1 w-full `}
    >
      <div
        className={`flex justify-start items-center w-full flex-col overflow-hidden divide-y divide-customgrey-300`}
        ref={tier}
      >
        {item?.fieldsdetails?.labels.map((label: any, index: number) => (
          <div
            style={{ backgroundColor: `${item.fieldsdetails.fieldsbgcolor}` }}
            key={index}
            className={`flex justify-start items-center w-full`}
          >
            <span
              className={`flex break-all border-r border-customgrey-240 p-1 justify-center items-center text-sm h-20 text-center max-w-[80px] w-full`}
              style={{
                backgroundColor: item.fieldsdetails.colors[index]
              }}
            >
              {label}
            </span>
            <div className="flex w-20 h-20 justify-center items-center">
              {item.fieldsdetails.templateImages[index].map(
                (image: any, index: number) => (
                  <img
                    key={index}
                    className={`w-full h-full object-cover`}
                    src={image}
                    alt="tierimage"
                  />
                )
              )}
            </div>
          </div>
        ))}
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
