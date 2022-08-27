import React from "react"

const UploadVideo = () => {
  const handleSubmit = () => {}

  return (
    <>
      <button
        type="button"
        className="text-indigo-800 font-bold dark:text-indigo-400"
        data-bs-toggle="modal"
        data-bs-target="#videoModal"
      >
        (Add a Video)
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="videoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Add a video
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form onSubmit={() => handleSubmit()}>
                <div className="mb-3 xl:w-96">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label inline-block mb-2 text-gray-700 text-sm"
                  >
                    Title of Video
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput4"
                    placeholder=""
                  />
                </div>
                <div className="mb-3 xl:w-96">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label inline-block mb-2 text-gray-700 text-sm"
                  >
                    Video URL
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput4"
                    placeholder=""
                  />
                </div>
                <div className="mb-3 xl:w-96">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label inline-block mb-2 text-gray-700 text-sm"
                  >
                    Channel URL
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput4"
                    placeholder=""
                  />
                </div>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                </button>
              </form>{" "}
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadVideo
