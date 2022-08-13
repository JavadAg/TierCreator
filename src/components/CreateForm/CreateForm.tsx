import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../utils/zodSchema"
import { Category } from "../../models/tier"

import Resizer from "react-image-file-resizer"
import { useEffect, useId, useState } from "react"
import slugify from "slugify"
import { BeatLoader } from "react-spinners"
import { Inputs } from "../../models/tier"
import { idText } from "typescript"
import { number } from "zod"
import { usePostTemplate } from "../../hooks/usePostTemplate"
import { useFetch } from "../../hooks/useFetch"
import { supabase } from "../../utils/client"
import { format } from "path"

const CreateForm = () => {
  const [formData, setFormData] = useState<Inputs>()
  const {
    data: categories,
    error,
    isLoading: isFetching
  } = useFetch("categories")

  const [coverImage, setCoverImage] = useState<string>()

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
    const slugifiedName = slugify(name, { lower: true })
    return slugifiedName
  }

  const addTemplate = usePostTemplate(formData)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await formhandler(data)
    setFormData(data)
  }

  useEffect(() => {
    if (formData) {
      addTemplate.mutate()
    }
  }, [formData])

  function makeid(length: number) {
    var result = ""
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const formhandler = async (data: Inputs) => {
    const nameToSlug = await slugifyName(data.name!)
    data.slug = nameToSlug
    const resizedCover: any = await resizeFile(data.cover![0])
    const newCover = new File([resizedCover], `${makeid(10)}.JPEG`)
    data.cover = [newCover]
    data.category_slug = categories![data.category_id!].slug
    data.category_name = categories![data.category_id!].name
    data.creator_id = user!.id
    let imagesArray: File[] = []
    for (const iterator of data.images!) {
      const resizedImage: any = await resizeFile(iterator)
      const newImage = new File([resizedImage], `${makeid(10)}.JPEG`)
      imagesArray.push(newImage)
      data.images = imagesArray
    }
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
        <div className="text-red-500 font-bold text-xl">
          Error : {addTemplate.error.message}
        </div>
      ) : addTemplate.isLoading ? (
        <BeatLoader color="#bf6be0" loading size={22} speedMultiplier={1} />
      ) : (
        <form
          className="flex justify-center items-start flex-col space-y-4 w-full text-zinc-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="name">
              Name of Template
            </label>
            <input
              className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
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
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="category">
              Select a Category:
            </label>
            <select
              className="rounded-md p-1 focus-within:outline-indigo-300 w-9/12"
              id="category"
              {...register("category_id")}
            >
              {isFetching ? (
                <option>Loading Categories...</option>
              ) : (
                categories?.map((category: Category, index: number) => (
                  <option key={category.id} value={index}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="description">
              Description of Template:
            </label>
            <input
              className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
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
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="cover">
              Select Template Cover Photo:
            </label>
            <input
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
            <img className="h-24" src={coverImage} />
            {errors.cover?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.cover.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="images">
              Upload a Set of Images for the Tier List Template:
            </label>
            <p>
              Consistent image size and orientation (square, portrait or
              landscape) work best. You can use our Text to Image Generator to
              quickly add text labels on your images. Large file sizes may cause
              the upload to fail. A minimum of 2 images are needed to make a
              template.
            </p>
            <input
              type="file"
              id="images"
              onChangeCapture={previewhandler}
              multiple={true}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              {...register("images")}
            />
            {tierImages?.map((image, index) => (
              <img key={index} className="h-24" src={image} />
            ))}

            {errors.images?.message && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.images.message}
              </span>
            )}
          </div>

          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="imageOrientation">
              Image Orientation
            </label>
            <select
              id="imageOrientation"
              className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
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
          <div className="flex justify-center items-start flex-col space-y-1 w-full">
            <label className="text-lg font-bold" htmlFor="defaultRowLables">
              Fields Label:
            </label>
            <div
              id="defaultRowLables"
              className="space-y-1 flex justify-center items-start flex-col"
            >
              {fields.map((item, index: number) => (
                <div key={item.id}>
                  <Controller
                    control={control}
                    name={`rows.${index}.label`}
                    render={({ field }) => (
                      <input {...field} placeholder="Enter label" />
                    )}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    DELETE
                  </button>
                  {errors.rows?.[index]?.label?.message && (
                    <span className="text-red-600 text-sm font-semibold">
                      {errors.rows?.[index]?.label?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => append({ label: "" })}>
            APPEND
          </button>

          <input
            placeholder="Submit"
            type="submit"
            className="bg-zinc-100 py-1 px-3 cursor-pointer hover:bg-zinc-200 duration-200 rounded-md font-bold"
          />
        </form>
      )}
    </>
  )
}

export default CreateForm
