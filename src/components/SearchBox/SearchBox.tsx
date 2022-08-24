import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useSearch from "../../hooks/useSearch"
import { Template } from "../../types/template.types"

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>()
  const { refetch, data } = useSearch(searchTerm as string)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    refetch()
  }

  return (
    <div className="flex justify-center items-center relative mx-2">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <input
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          type="search"
          className={` form-control placeholder:italic placeholder:text-slate-400 block w-full text-sm py-1.5  my-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 pl-9 pr-3 focus:bg-white focus:border-indigo-600 focus:outline-none xl:w-72`}
          placeholder="Type a template name"
        />
      </label>

      {data?.length! > 0 && (
        <ul
          data-bs-dismiss="offcanvas"
          onClick={() => setSearchTerm("")}
          className="flex absolute bg-white border border-indigo-300 rounded justify-center items-center text-center flex-col z-40 text-sm divide-y divide-gray-700 w-full text-gray-800 dark:text-zinc-200 top-12 font-bold "
        >
          {data!.map((item: Template) => (
            <Link
              data-bs-dismiss="modal"
              className="w-full py-1 rounded text-gray-900  bg-indigo-100"
              key={item.id}
              to={`/create/${item.slug}`}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
