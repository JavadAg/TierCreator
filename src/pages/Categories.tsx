import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

const Categories = () => {
  const { data, error, isLoading } = useFetch("categories")

  if (error) return <div>Something went horrible wrong ...</div>

  return (
    <div className="space-y-5">
      <span className="font-bold text-4xl">TierMaker Template Categories</span>
      <p>
        There are over 1 million tier list templates on TierMaker. Browse the
        categories on this page or use our search box to find the perfect tier
        list template for anything. If the perfect template doesn't yet exist,
        you can create your own template.
      </p>
      <div>
        {isLoading ? (
          <div className="text-2xl font-bold text-center">Loading...</div>
        ) : (
          <div className="flex flex-wrap">
            {data?.map((category, index) => (
              <Link
                key={category.slug}
                to={`/${category.slug}`}
                className="flex justify-center items-center m-1 flex-col"
              >
                <img
                  className="object-cover w-36 h-36"
                  key={index}
                  src={category.image}
                />
                <span className="bg-black text-white w-36 text-center">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
