import html2canvas from "html2canvas"
import React, { useRef, useState } from "react"
import { usePostTier } from "../../hooks/usePostTier"
import { supabase } from "../../utils/client"

interface IProps {
  id: React.MutableRefObject<null>
  name: string
  getFieldsDetails: () => {}
  category_name: string
  template_name: string
}

const PageToImage: React.FC<IProps> = ({
  id,
  name,
  getFieldsDetails,
  template_name,
  category_name
}) => {
  const user = supabase.auth.user()

  let form = {
    name: "",
    description: "",
    template_name: "",
    category_name: "",
    fieldsdetails: {},
    creator_id: "",
    creator_name: "",
    creator_photo: ""
  }

  console.log("form", form)
  const addTier = usePostTier(form)

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
    const canvas = await html2canvas(id.current!, { useCORS: true })
    const image = canvas.toDataURL("image/png", 1.0)
    downloadImage(image, name)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    getFieldsDetails()
    form.template_name = template_name
    form.category_name = category_name
    form.fieldsdetails = getFieldsDetails()
    form.creator_id = user!.id
    form.creator_name = user!.user_metadata.name
    form.creator_photo = user!.user_metadata.picture

    addTier.mutate()
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
                Download or Save
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center items-center flex-col space-y-2 my-2"
            >
              <label htmlFor="name">Enter name</label>
              <input
                onChange={(e) => (form.name = e.target.value)}
                className="border border-zinc-200 px-2 py-1 rounded-xl w-3/4"
                type="text"
                id="name"
                placeholder="name"
              />
              <label htmlFor="description">Enter description</label>
              <input
                onChange={(e) => (form.description = e.target.value)}
                className="border border-zinc-200 px-2 py-1 rounded-xl w-3/4"
                type="text"
                id="description"
                placeholder="description"
              />
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={onCapture}
              >
                Download
              </button>
              <button
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageToImage
