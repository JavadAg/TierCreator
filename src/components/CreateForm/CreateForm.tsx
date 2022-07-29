import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../../utils/zodSchema"
import { Category } from "../../models/tier"
import { useGetCategoriesQuery } from "../../services/tierApi"
import Resizer from "react-image-file-resizer"
import { ChangeEvent, useState } from "react"

type Inputs = {
  name: string
  selectedCategory: string
  description: string
  cover: File[]
  images: File[]
  orientation: string
  rowOne: string
  rowTwo: string
  rowThree: string
  rowFour: string
  rowFive: string
  extraRowOne: string
  extraRowTwo: string
  extraRowThree: string
  extraRowFour: string
  extraRowFive: string
}

const CreateForm = () => {
  const [extraRowEnabled, setExtraRowEnabled] = useState(false)
  const { data: categories, isLoading } = useGetCategoriesQuery(undefined)
  const [coverImage, setCoverImage] = useState<string>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({ resolver: zodResolver(schema) })

  /*  const setSize = () => {
    if (watch().orientation == "Square") {
      return { h: 80, w: 80 }
    } else if (watch().orientation == "Landscape") {
      return { h: 80, w: 100 }
    } else {
      return { h: 100, w: 80 }
    }
  } */

  /*  const coverhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files instanceof FileList && resizeFile(e.target.files[0])
  } */

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          /*  setCoverImage(uri) */
        },
        "base64"
      )
    })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  if (errors.name) {
    console.log(errors.name)
  }
  console.log(coverImage)
  return (
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
          {...register("selectedCategory")}
        >
          {isLoading ? (
            <option>Loading Categories...</option>
          ) : (
            categories?.map((category: Category) => (
              <option key={category.id} value={category.name}>
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
        <img src={coverImage} />
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
          Consistent image size and orientation (square, portrait or landscape)
          work best. You can use our Text to Image Generator to quickly add text
          labels on your images. Large file sizes may cause the upload to fail.
          A minimum of 2 images are needed to make a template.
        </p>
        <input
          type="file"
          id="images"
          multiple={true}
          accept="image/jpeg,image/jpg,image/png,image/webp"
          {...register("images")}
        />
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
          Default Row Label Text:
        </label>
        <div id="defaultRowLables" className="space-y-1">
          <input
            className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
            type="text"
            placeholder="S"
            {...register("rowOne")}
          />
          {errors.rowOne?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.rowOne.message}
            </span>
          )}
          <input
            className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
            type="text"
            placeholder="A"
            {...register("rowTwo")}
          />
          {errors.rowTwo?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.rowTwo.message}
            </span>
          )}
          <input
            className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
            type="text"
            placeholder="B"
            {...register("rowThree")}
          />
          {errors.rowThree?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.rowThree.message}
            </span>
          )}
          <input
            className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
            type="text"
            placeholder="C"
            {...register("rowFour")}
          />
          {errors.rowFour?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.rowFour.message}
            </span>
          )}
          <input
            className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
            type="text"
            placeholder="D"
            {...register("rowFive")}
          />
          {errors.rowFive?.message && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.rowFive.message}
            </span>
          )}
        </div>
      </div>

      <div id="accordionExample" className="w-full accordion">
        <div className="accordion-item ">
          <h2 className="accordion-header mb-0" id="headingOne">
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              className="font-bold text-lg bg-slate-100 hover:bg-slate-200 duration-200 mb-2 rounded-md p-1"
              onClick={() => setExtraRowEnabled((prev) => !prev)}
            >
              {extraRowEnabled ? "Disable Extra Rows" : "Enable Extra Rows"}
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body space-y-1 flex justify-center items-start flex-col">
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 6"
                {...register("extraRowOne")}
              />
              {errors.extraRowOne?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.extraRowOne.message}
                </span>
              )}
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 7"
                {...register("extraRowTwo")}
              />
              {errors.extraRowTwo?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.extraRowTwo.message}
                </span>
              )}
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300 "
                type="text"
                placeholder="Row 8"
                {...register("extraRowThree")}
              />
              {errors.extraRowThree?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.extraRowThree.message}
                </span>
              )}
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 9"
                {...register("extraRowFour")}
              />
              {errors.extraRowFour?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.extraRowFour.message}
                </span>
              )}
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 10"
                {...register("extraRowFive")}
              />
              {errors.extraRowFive?.message && (
                <span className="text-red-600 text-sm font-semibold">
                  {errors.extraRowFive.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <input
        placeholder="Submit"
        type="submit"
        className="bg-zinc-100 py-1 px-3 cursor-pointer hover:bg-zinc-200 duration-200 rounded-md font-bold"
      />
    </form>
  )
}

export default CreateForm
