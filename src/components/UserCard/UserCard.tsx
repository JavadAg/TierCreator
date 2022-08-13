import { useNavigate } from "react-router-dom"
import useFetchById from "../../hooks/useFetch"
import { supabase } from "../../utils/client"
import TierContainer from "../TierContainer/TierContainer"

const UserDetails = () => {
  const user = supabase.auth.user()
  const { data: tiers, error } = useFetchById(
    "tier",
    "creator_id",
    undefined,
    user!.id
  )
  const { data: templates, isLoading } = useFetchById(
    "templates",
    "creator_id",
    undefined,
    user!.id
  )
  console.log(tiers, templates)

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center items-center w-full flex-col">
          <div className="flex justify-center items-center bg-blue-200">
            <span>Name : </span>
            <span>{user?.user_metadata.full_name}</span>
          </div>
          <span className="text-2xl font-bold">Tiers</span>
          <div className="flex justify-center items-start w-full flex-wrap">
            {tiers?.map((item: any) => (
              <TierContainer key={item.id} item={item} isDashboard={true} />
            ))}
          </div>
          <div>
            <span className="text-2xl font-bold">Templates</span>
          </div>
          <div className="flex justify-center items-center flex-wrap">
            {templates?.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-center items-center bg-red-200 flex-col m-2"
              >
                <span>Name : {item.name}</span>
                <span>Description : {item.description}</span>
                <span>Category : {item.category}</span>
                <div>
                  Labels :
                  {item.rows.map((row: any) => (
                    <span>{row.label}</span>
                  ))}
                </div>
                <img
                  className="object-cover h-16 w-16"
                  src={item.cover}
                  alt="template_cover"
                />
                <div className="flex justify-center items-center">
                  Images :
                  {item.image.map((image: any) => (
                    <img
                      key={image.id}
                      className="object-cover w-12 h-12"
                      src={image.url}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetails
