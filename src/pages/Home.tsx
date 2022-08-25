import FeaturedTemplates from "../components/FeaturedTemplates/FeaturedTemplates"
import PageDescription from "../components/PageDescription/PageDescription"

import Videos from "../components/Videos/Videos"

const Home = () => {
  return (
    <>
      <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
        <PageDescription
          title="Create a Tier List for Anything"
          description="A tier list is a ranking system that allows you to rank anything in
            tiers from the best to worst. Using a tier list allows you to group
            similar ranked items together and it’s quick and easy to create a
            tier list."
        />
        <Videos />
        <FeaturedTemplates />
      </div>
    </>
  )
}

export default Home
