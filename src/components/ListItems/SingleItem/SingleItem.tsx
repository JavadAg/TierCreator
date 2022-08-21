import { useNavigate } from "react-router-dom"

const SingleItem = ({ slug, image, name, isCreate }: any) => {
  const navigate = useNavigate()

  return (
    <div
      key={slug}
      onClick={() => navigate(isCreate ? `/create/${slug}` : `/${slug}`)}
      className="flex flex-auto cursor-pointer justify-center w-36 h-36 max-w-[350px] items-center flex-col p-1 border border-gray-300 rounded-md shadow-sm active:shadow-md active:ring-1 active:ring-indigo-300 duration-200 active:scale-105"
    >
      <img
        className="object-cover border border-gray-100 overflow-hidden h-full w-full rounded-md"
        src={image}
        alt="card_image"
      />
      <span className="bg-gray-100 rounded-md text-gray-900 mt-1 w-full text-center font-bold text-sm">
        {name}
      </span>
    </div>
  )
}

export default SingleItem
