import { itemsEqual } from "@dnd-kit/sortable/dist/utilities"
import React, { MutableRefObject, useEffect, useState } from "react"
import { setErrorMap } from "zod"
import { usePostTier } from "../../hooks/usePostTier"
import { Template } from "../../models/tier"
import { supabase } from "../../utils/client"
import makeid from "../../utils/generateRanStr"
import { downloadasImage } from "../../utils/pageToImage"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tierschema } from "../../utils/zodSchema"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"

interface IProps {
  id: MutableRefObject<HTMLElement | null>
  template: Template
  getFieldsDetails: () => {
    colors: []
    labels: []
    templateImages: []
    fieldsbgcolor: string
  }
  addTier: any
}

interface IForm {
  name: String
  description: String
}

const TierModal: React.FC<IProps> = ({
  id,
  template,
  getFieldsDetails,
  addTier
}) => {
  const user = supabase.auth.user()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IForm>({
    resolver: zodResolver(tierschema)
  })

  const onSubmit = async (data: any) => {
    await formhandler(data)
  }

  const formhandler = async (data: any) => {
    data.template_name = template.name
    data.template_slug = template.slug
    data.category_name = template.category_name
    data.category_slug = template.category_slug
    data.creator_id = user!.id
    data.creator_name = user!.user_metadata.name
    data.creator_photo = user!.user_metadata.picture
    data.placeholderName = makeid(10) + Date.now()
    data.image = await downloadasImage({ id, isSaving: true })

    const { colors, labels, templateImages, fieldsbgcolor } = getFieldsDetails()

    const isEmpty = templateImages.filter((item: any) => item.length !== 0)

    if (isEmpty.length == 0) {
      toast.error("containers are empty , Create Tier !")
      return
    }

    data.fieldsdetails = { colors, labels, templateImages, fieldsbgcolor }
    await addTier.mutateAsync(data, {
      onSuccess: () => {
        navigate(`/${data.category_slug}/${data.template_slug}`)
      }
    })
  }

  return (
    <>
      <button
        className="bg-indigo-400 text-customgrey-100 flex border border-indigo-200 rounded p-1 justify-center w-52 shadow-200 text-sm self-center items-center hover:bg-indigo-500 h-full duration-200"
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
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center items-center flex-col space-y-2 my-2"
            >
              <label htmlFor="name">Enter name</label>
              <input
                className="border border-zinc-200 px-2 py-1 rounded-xl w-3/4"
                type="text"
                id="name"
                placeholder="name"
                {...register("name")}
              />

              {errors.name?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.name.message}
                </span>
              )}
              <label htmlFor="description">Enter description</label>
              <input
                className="border border-zinc-200 px-2 py-1 rounded-xl w-3/4"
                type="text"
                id="description"
                placeholder="description"
                {...register("description")}
              />
              {errors.description?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.description.message}
                </span>
              )}
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => downloadasImage({ id })}
              >
                Download
              </button>
              <button
                data-bs-dismiss="modal"
                disabled={addTier.isLoading}
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${
                  addTier.isLoading && "cursor-not-allowed "
                } `}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  )
}

export default TierModal
