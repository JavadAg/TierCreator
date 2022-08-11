import html2canvas from "html2canvas"

const PageToImage = ({ id, name, excludeNode }: any) => {
  const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement("a")

    fakeLink.download = fileName

    fakeLink.href = blob

    document.body.appendChild(fakeLink)
    fakeLink.click()
    document.body.removeChild(fakeLink)

    fakeLink.remove()
  }

  const onCapture = async () => {
    const canvas = await html2canvas(id.current, { useCORS: true })
    const image = canvas.toDataURL("image/png", 1.0)
    downloadImage(image, name)
  }

  const handleSave = async () => {
    
  }

  return (
    <>
      <button
        className="bg-slate-500 flex border-b border-slate-400 p-1 justify-center items-center hover:bg-slate-400/50 h-full duration-200"
        data-bs-toggle="modal"
        data-bs-target={`#saveModal`}
      >
        Save or Download
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id={`saveModal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md ">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 "
                id="exampleModalLabel"
              >
                sax
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <button onClick={onCapture}>Download</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageToImage
