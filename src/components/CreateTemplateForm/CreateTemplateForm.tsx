import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../utils/zodSchema"
import { Category, Row } from "../../types/template.types"
import Resizer from "react-image-file-resizer"
import { useState } from "react"
import slugify from "slugify"
import { BeatLoader } from "react-spinners"
import { Inputs } from "../../types/template.types"
import { usePostTemplate } from "../../hooks/usePostTemplate"
import useFetchById from "../../hooks/useFetch"
import { supabase } from "../../utils/client"
import makeid from "../../utils/generateRanStr"
import { IoTrashBinOutline, IoAddCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from "react-toastify"

const CreateTemplateForm = () => {
  const {
    data: categories,
    error,
    isLoading: isFetching,
    isError
  } = useFetchById("id", true, "categories", undefined, "", "")

  const [isSubmiting, setIsSubmiting] = useState(false)

  const [coverImage, setCoverImage] = useState<string>()

  const navigate = useNavigate()

  const user = supabase.auth.user()

  const [tierImages, setTierImages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      rows: [
        { label: "" },
        { label: "" },
        { label: "" },
        { label: "" },
        { label: "" }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows"
  })

  //resize and base64 cover and images before upload
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        "file"
      )
    })

  const slugifyName = async (name: string) => {
    const slugifiedName = slugify(name, {
      lower: true,
      strict: true
    }).toLowerCase()
    return slugifiedName
  }

  const addTemplate = usePostTemplate()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await formhandler(data)
    await addTemplate.mutateAsync(data, {
      onSuccess: () => navigate(`/create/${data.slug}`)
    })
  }

  const cmprows = async (rows: Row[]) => {
    for (let i = 0; i < rows.length; i++) {
      for (let k = i + 1; k < rows.length; k++) {
        if (rows[i].label === rows[k].label) {
          toast.error("Labels can't be same")
          throw new Error()
        }
      }
    }
  }
  console.log(watch("images"))

  const formhandler = async (data: Inputs) => {
    await cmprows(data.rows!)

    setIsSubmiting(true)
    const nameToSlug = await slugifyName(data.name!)
    data.slug = nameToSlug + "-" + Date.now()
    data.name =
      data!.name?.[0].toUpperCase() + data!.name!.slice(1).toLowerCase()

    const resizedCover = (await resizeFile(data.cover![0])) as File
    const newCover = new File([resizedCover], `${makeid(10) + Date.now()}.JPEG`)
    data.cover = [newCover]
    data.category_slug = categories?.data[data.category_id!].slug
    data.category_name = categories?.data[data.category_id!].name
    data.creator_id = user!.id
    let imagesArray: File[] = []
    for (const iterator of data.images!) {
      const resizedImage = (await resizeFile(iterator)) as File
      const newImage = new File(
        [resizedImage],
        `${makeid(10) + Date.now()}.JPEG`
      )
      imagesArray.push(newImage)
      data.images = imagesArray
    }
    setIsSubmiting(false)
  }

  const previewhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTierImages([])
    const fileArray = Array.from(e.target.files!)
    for (let i = 0; i < fileArray.length; i++) {
      const url: string = URL.createObjectURL(fileArray[i])
      setTierImages((prev) => [...prev, url])
    }
  }

  return (
    <>
      {addTemplate.error instanceof Error ? (
        <div className="text-red-500 font-bold text-md">
          Error : {addTemplate.error.message}
        </div>
      ) : addTemplate.isLoading ? (
        <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
      ) : (
        <form
          className="flex justify-center items-center text-center flex-col space-y-4 pb-4 w-full text-gray-700 bg-gray-50 rounded-xl divide-y divide-gray-200 sm:px-10 xl:px-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center items-center text-center flex-col space-y-2 w-full p-2">
            <label className="text-md font-bold" htmlFor="name">
              Name of Template
            </label>
            <input
              className="border placeholder:italic placeholder:text-slate-400 border-gray-200 w-full px-2 py-1 rounded-md focus-visible:outline-indigo-300"
              id="name"
              type="text"
              placeholder="Describe the Template Name"
              {...register("name")}
            />

            {errors.name?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center flex-col space-y-1 w-full  p-2">
            <label className="text-md font-bold" htmlFor="category">
              Select a Category
            </label>
            {isError ? (
              <span>error fetching categories try again</span>
            ) : isFetching ? (
              <span>Loading Categories...</span>
            ) : (
              <select
                className="rounded-md py-1 focus-within:outline-indigo-300 w-full border px-2"
                id="category"
                defaultValue={0}
                {...register("category_id")}
              >
                {categories?.data.map((category: Category, index: number) => (
                  <option key={category.id} value={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-center items-center flex-col space-y-1 w-full p-2">
            <label className="text-md font-bold" htmlFor="description">
              Description of Template
            </label>
            <input
              className="border placeholder:italic placeholder:text-slate-400 block border-gray-200 w-full px-2 py-1 rounded-md focus-visible:outline-indigo-300 "
              id="description"
              type="text"
              placeholder="Description of the Template"
              {...register("description")}
            />

            {errors.description?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center flex-col space-y-2 w-full bg-gray-50 p-2">
            <label className="text-md font-bold" htmlFor="cover">
              Select Template Cover Photo
            </label>
            <input
              className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-indigo-400
            hover:file:bg-violet-100"
              type="file"
              id="cover"
              onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.target.files instanceof FileList &&
                setCoverImage(URL.createObjectURL(e.target.files[0]))
              }
              multiple={false}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              {...register("cover")}
            />
            {coverImage && <img className="h-24" src={coverImage} />}
            {errors.cover?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.cover.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center flex-col space-y-2 w-full p-2">
            <label className="text-md font-bold" htmlFor="images">
              Upload a Set of Images for the Tier List Template
            </label>
            <p className="text-sm">
              Consistent image size and orientation (square, portrait or
              landscape) work best. Large file sizes may cause the upload to
              fail. A minimum of 2 images are needed to make a template. Only
              upload jpeg , png , webp files .
            </p>
            <input
              type="file"
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-indigo-400
              hover:file:bg-violet-100"
              id="images"
              onChangeCapture={previewhandler}
              multiple={true}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              {...register("images")}
            />
            <div className="flex justify-center gap-1 items-center flex-wrap">
              {tierImages?.map((image, index) => (
                <img
                  key={index}
                  className="h-24 w-24 object-cover"
                  src={image}
                />
              ))}
            </div>
            {errors.images?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.images.message}
              </span>
            )}
          </div>

          <div className="flex justify-center items-center flex-col space-y-2 w-full p-2">
            <label className="text-md font-bold" htmlFor="imageOrientation">
              Image Orientation
            </label>
            <select
              id="imageOrientation"
              className="border border-gray-200 w-full px-2 p-1 rounded-md focus-visible:outline-indigo-300 focus:outline-indigo-400"
              {...register("orientation")}
              defaultValue="1"
            >
              <option value="Square" id="1">
                Square
              </option>
              <option value="Landscape">Landscape</option>
              <option value="Portrait">Portrait</option>
            </select>
          </div>
          {errors.orientation?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.orientation.message}
            </span>
          )}
          <div className="flex justify-center items-center flex-col space-y-2 w-full p-2">
            <label className="text-md font-bold" htmlFor="defaultRowLables">
              Fields Label
            </label>
            <div
              id="defaultRowLables"
              className="space-y-1 flex justify-center items-start flex-col w-full"
            >
              {fields.map((item, index: number) => (
                <div className="flex justify-center items-center flex-col w-full py-2 divide divide-gray-400 space-y-2">
                  <Controller
                    key={item.id}
                    control={control}
                    name={`rows.${index}.label`}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder={`Enter Label ${index + 1}`}
                        className="placeholder:italic placeholder:text-slate-400 border border-gray-200 w-full px-2 py-1 rounded-md focus-visible:outline-indigo-300"
                      />
                    )}
                  />
                  {index > 4 && (
                    <button
                      disabled={isSubmiting}
                      className={`bg-white py-1 shadow shoadow-sm px-3 cursor-pointer hover:bg-gray-50 duration-200 text-lg rounded-md `}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <IoTrashBinOutline />
                    </button>
                  )}

                  {errors.rows?.[index]?.label?.message && (
                    <span className="text-red-600 text-sm font-semibold">
                      {errors.rows?.[index]?.label?.message}
                    </span>
                  )}
                  {errors.rows?.message && (
                    <span className="text-red-600 text-sm font-semibold">
                      {errors.rows?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {fields.length < 10 && (
              <button
                disabled={isSubmiting}
                className="py-1 px-3 bg-white border shadow shoadow-sm border-gray-200  cursor-pointer hover:bg-gray-50 duration-200 text-lg rounded-md"
                type="button"
                onClick={() => append({ label: "" })}
              >
                <IoAddCircleOutline />
              </button>
            )}
          </div>
          {user ? (
            <button
              disabled={isSubmiting}
              placeholder="Submit"
              type="submit"
              className={`inline-flex items-center px-4 py-1 leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 ${
                isSubmiting && "cursor-not-allowed "
              }`}
            >
              {isSubmiting && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Submit
            </button>
          ) : (
            <span className="text-red-500 font-bold p-2">Login to submit</span>
          )}

          <ToastContainer position="bottom-right" />
        </form>
      )}
    </>
  )
}

export default CreateTemplateForm
