const Paginate = ({ count, searchParams, setSearchParams, lastItem }: any) => {
  console.log(lastItem, count)
  const nexthandler = () => {
    setSearchParams(`page=${Number(searchParams.get("page")) + 1}`)
  }

  const prevhandler = () => {
    setSearchParams(`page=${Number(searchParams.get("page")) - 1}`)
  }

  return (
    <div className=" p-2">
      <button
        className="disabled:text-gray-400 hover:bg-gray-200 duration-200 text-gray-800 bg-gray-100 p-2 rounded-md px-3"
        disabled={Number(searchParams.get("page")) === 0}
        onClick={() => prevhandler()}
      >
        Prev
      </button>{" "}
      |{" "}
      <button
        disabled={lastItem >= count}
        className="disabled:text-gray-400 hover:bg-gray-200 duration-200 text-gray-800 bg-gray-100 p-2 rounded-md px-3"
        onClick={() => nexthandler()}
      >
        Next
      </button>
    </div>
  )
}

export default Paginate
