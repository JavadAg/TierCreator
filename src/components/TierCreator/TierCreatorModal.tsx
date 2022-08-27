import React, { MutableRefObject, useRef, useState } from "react"
import { Template } from "../../types/template.types"
import { supabase } from "../../utils/client"
import makeid from "../../utils/generateRanStr"
import { downloadasImage } from "../../utils/pageToImage"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tierschema } from "../../utils/zodSchema"
import { useNavigate } from "react-router-dom"
import { usePostTier } from "../../hooks/usePostTier"
import { Fieldsdetails, TierInputs } from "../../types/tier.types"

interface IProps {
  id: MutableRefObject<HTMLElement | null>
  template: Template
  getFieldsDetails: () => Fieldsdetails
}

interface IForm {
  name: String
  description: String
}

const TierModal: React.FC<IProps> = ({ id, template, getFieldsDetails }) => {
  const closeModal = useRef<HTMLButtonElement>(null)

  const user = supabase.auth.user()

  const navigate = useNavigate()

  const addTier = usePostTier()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TierInputs>({
    resolver: zodResolver(tierschema)
  })

  const onSubmit = async (data: TierInputs) => {
    await formhandler(data)
  }

  const formhandler = async (data: TierInputs) => {
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

    const isEmpty = templateImages.filter((item: string[]) => item.length !== 0)

    if (isEmpty.length == 0) {
      toast.error("Containers are empty , drag some photos")
      return
    }

    data.fieldsdetails = { colors, labels, templateImages, fieldsbgcolor }

    await addTier.mutateAsync(data, {
      onSuccess(data, variables, context) {
        closeModal.current?.click()
        navigate(
          `/${data[0].category_slug}/${data[0].template_slug}/${data[0].id}`
        )
      }
    })
  }

  return (
    <>
      <button
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0 self-center  transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem]"
        data-bs-toggle="modal"
        data-bs-target={`#saveModal`}
      >
        Save or Download
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto backdrop-blur-md dark:bg-gray-800/40"
        id={`saveModal`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current dark:bg-gray-900">
            <div className="modal-header flex flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md ">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 dark:text-gray-200"
                id="exampleModalLabel"
              >
                Download or Save
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-gray-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                ref={closeModal}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center items-center flex-col space-y-2 my-2 "
            >
              <label className="dark:text-gray-200" htmlFor="name">
                Enter name
              </label>
              <input
                className="border border-zinc-200 px-2 py-1 rounded-md w-3/4 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none placeholder:italic dark:bg-gray-700 dark:border-gray-800 dark:text-gray-200"
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
              <label className="dark:text-gray-200" htmlFor="description">
                Enter description
              </label>
              <input
                className="border border-zinc-200 px-2 py-1 rounded-md w-3/4 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none placeholder:italic dark:bg-gray-700 dark:border-gray-800 dark:text-gray-200"
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
              <div className="flex justify-center items-center flex-col space-y-2 pt-2">
                <button
                  data-mdb-ripple="true"
                  type="button"
                  data-mdb-ripple-color="light"
                  className={`flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem] ${
                    addTier.isLoading && "cursor-not-allowed "
                  } `}
                  onClick={() => downloadasImage({ id })}
                >
                  Download
                </button>
                {user ? (
                  <button
                    disabled={addTier.isLoading}
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className={`flex justify-center items-center text-sm space-x-1 bg-indigo-100 focus:bg-indigo-200 hover:bg-indigo-200 active:bg-indigo-300 w-52 py-1.5 rounded-md text-grey-900 border border-indigo-100 leading-tight focus:outline-none focus:ring-0   transition duration-150 ease-in-out sm:w-56 md:w-60 xl:w-64 xl:text-[.9rem] ${
                      addTier.isLoading && "cursor-not-allowed "
                    } `}
                  >
                    Save
                  </button>
                ) : (
                  <span className="font-bold text-red-500">
                    Login to submit
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  )
}

export default TierModal
