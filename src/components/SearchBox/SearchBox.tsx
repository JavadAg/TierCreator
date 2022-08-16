import React, { useState } from "react"
import { Link } from "react-router-dom"
import useSearch from "../../hooks/useSearch"

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<any>()
  const { refetch, data } = useSearch(searchTerm)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    refetch()
  }

  return (
    <div className="flex justify-center items-center relative">
      <input
        onChange={(e: any) => handleSearch(e.target.value)}
        type="search"
        className={` block right-0  text-base font-normal text-gray-700  bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none duration-150`}
        placeholder="Type a Template name"
      />
      {data?.length && (
        <ul className="flex absolute bg-white border border-black justify-center items-center text-center flex-col z-40 text-base space-y-4 w-full text-gray-800 dark:text-zinc-200 top-14 font-bold ">
          {data!.map((item) => (
            <li
              className="hover:text-gray-700 dark:hover:text-zinc-700"
              key={item.id}
            >
              <Link to={`/create/${item.slug}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
