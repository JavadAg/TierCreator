import React from "react"
import { IoArrowDownCircleOutline } from "react-icons/io5"
import TierImage from "../TierListItem/TierImage/TierImage"

const UserTiers = ({ data }: any) => {
  return (
    <>
      <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
        <button
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tierCollapse"
          aria-expanded="false"
          aria-controls="tierCollapse"
        >
          <span>Latest Tiers </span>
          <IoArrowDownCircleOutline className="text-xl" />
        </button>
      </p>
      <div className="collapse" id="tierCollapse">
        <div className="flex justify-center items-start w-full flex-wrap">
          {data.map((item: any) => (
            <TierImage key={item.id} item={item} isDashboard={true} />
          ))}
        </div>
      </div>
    </>
  )
}

export default UserTiers
