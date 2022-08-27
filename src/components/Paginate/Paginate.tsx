import { URLSearchParamsInit } from "react-router-dom"

interface IProps {
  count: number
  searchParams: URLSearchParams
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined
          state?: any
        }
      | undefined
  ) => void
  lastItem: number
}

const Paginate: React.FC<IProps> = ({
  count,
  searchParams,
  setSearchParams,
  lastItem
}) => {
  const nexthandler = () => {
    setSearchParams(`page=${Number(searchParams.get("page")) + 1}`)
  }

  const prevhandler = () => {
    setSearchParams(`page=${Number(searchParams.get("page")) - 1}`)
  }

  return (
    <div className=" p-2">
      <button
        className="disabled:text-gray-400 hover:bg-gray-200 duration-200 text-gray-800 bg-gray-100 p-2 rounded-md px-3 dark:bg-gray-800 dark:disabled:gray-500 dark:text-gray-300 dark:disabled:text-gray-400"
        disabled={Number(searchParams.get("page")) === 0}
        onClick={() => prevhandler()}
      >
        Prev
      </button>{" "}
      |{" "}
      <button
        disabled={lastItem >= count}
        className="disabled:text-gray-400 hover:bg-gray-200 duration-200 text-gray-800 bg-gray-100 p-2 rounded-md px-3 dark:bg-gray-800 dark:disabled:gray-500 dark:text-gray-300 dark:disabled:text-gray-400"
        onClick={() => nexthandler()}
      >
        Next
      </button>
    </div>
  )
}

export default Paginate
