import React from "react"

const UserCard = ({ data }: any) => {
  return (
    <div className="flex justify-center items-center bg-customgrey-100 p-1 rounded shadow-200 border border-customgrey-220 text-center space-x-1 px-2 w-full">
      <img
        className="object-cover h-12 rounded-full"
        src={
          data.creator_photo ||
          "https://feliwhcrkkjbvhycuxzk.supabase.co/storage/v1/object/public/category-images/Dylan39968148.png"
        }
        alt="user_photo"
      />
      <span className="capitalize font-bold text-customgrey-700">
        {data.creator_name}
      </span>
    </div>
  )
}

export default UserCard
