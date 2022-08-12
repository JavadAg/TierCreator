import { Link, useParams } from "react-router-dom"
import useFetchById from "../hooks/useFetch"

const Templates = () => {
  const { slug } = useParams()
  const { data, error, isLoading } = useFetchById(
    "templates",
    "category",
    slug!
  )

  if (error) return <div>Something went horrible wrong ...</div>

  return (
    <div className="flex flex-col space-y-5 justify-center items-start">
      <span className="font-bold text-4xl">
        Cars & Racing Tier List Templates
      </span>
      <div className="flex justify-center items-center space-x-2">
        <button className="bg-zinc-800 hover:bg-zinc-700 duration-200 rounded-md text-slate-200 px-2 py-1">
          Recent Cars & Racing Tier Lists
        </button>
        <button className="bg-indigo-800 hover:bg-indigo-700 duration-200 rounded-md text-slate-200 px-2 py-1">
          Create a tier from this template
        </button>
      </div>

      <span>A collection of cars and racing tier list templates.</span>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {data?.length! > 0 ? (
            <div className="flex flex-wrap justify-center items-center m-1">
              {data?.map((template, index) => (
                <>
                  <Link
                    key={template.slug}
                    state={template}
                    to={`/create/${template.slug}-${index}`}
                    className="flex justify-center items-center m-1 flex-col"
                  >
                    <img
                      className="object-cover w-36 h-36"
                      key={index}
                      src={template.cover}
                    />
                    <span className="bg-black text-white w-36 text-center">
                      {template.name}
                    </span>
                  </Link>
                </>
              ))}
            </div>
          ) : (
            <div>No Template exist , Create one</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Templates
