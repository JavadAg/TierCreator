import { useNavigate } from "react-router-dom"
import ImageWithFallback from "../../ImageWithFallback/ImageWithFallback"

interface IProps {
  slug: string
  image: string
  name: string
  isCreate: boolean
}

const SingleItem: React.FC<IProps> = ({ slug, image, name, isCreate }) => {
  const navigate = useNavigate()

  return (
    <div
      key={slug}
      onClick={() => navigate(isCreate ? `/create/${slug}` : `/${slug}`)}
      className="flex flex-auto cursor-pointer justify-center w-full h-44 items-center flex-col p-1 border border-gray-300 rounded-md shadow-sm active:shadow-md active:ring-1 active:ring-indigo-300 duration-200 active:scale-105 sm:h-52 dark:border-gray-700"
    >
      <ImageWithFallback
        fallback="https://placehold.co/400/png?text=Error"
        className="object-cover border border-gray-100 overflow-hidden h-full mb-1 w-full rounded-md dark:border-gray-700"
        src={image}
        alt="card_image"
      />
      <span className="bg-gray-100 rounded-md text-gray-900 mt-1 w-full text-center font-bold text-sm dark:bg-gray-800 dark:text-gray-300">
        {name}
      </span>
    </div>
  )
}

export default SingleItem
