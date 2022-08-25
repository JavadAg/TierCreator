import { BeatLoader } from "react-spinners"
import { Category } from "../../types/category.types"
import { Template } from "../../types/template.types"
import SingleItem from "./SingleItem/SingleItem"

interface IProps {
  isLoading: boolean
  data: Template[] | Category[]
  isCreate: boolean
  isTemplate: boolean
}

const ListItems: React.FC<IProps> = ({
  isLoading,
  data,
  isCreate,
  isTemplate
}) => {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4 w-full">
      {isLoading && (
        <div className="flex justify-center items-center">
          <BeatLoader color="#c7d2fe" loading size={22} speedMultiplier={1} />
        </div>
      )}
      {data?.map((card: Template | Category) => (
        <SingleItem
          key={card.id}
          slug={card.slug}
          image={isTemplate ? (card.cover as string) : (card.image as string)}
          name={card.name}
          isCreate={isCreate}
        />
      ))}
    </div>
  )
}

export default ListItems
