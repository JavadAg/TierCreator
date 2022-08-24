import { Category } from "../../types/category.types"
import { Template } from "../../types/template.types"
import CardSkeleton from "../Skeleton/CardSkeleton"
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
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
      {isLoading && <CardSkeleton cards={10} />}
      {data?.map((card: Template | Category) => (
        <SingleItem
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
