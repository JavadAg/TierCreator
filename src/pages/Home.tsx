import FeaturedTemplates from "../components/FeaturedTemplates/FeaturedTemplates"

import Videos from "../components/Videos/Videos"

const Home = () => {
  return (
    <>
      <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
        <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4">
          <span className="font-bold text-lg text-gray-800 md:text-xl">
            Create a Tier List for Anything
          </span>
          <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
            A tier list is a ranking system that allows you to rank anything in
            tiers from the best to worst. Using a tier list allows you to group
            similar ranked items together and it’s quick and easy to create a
            tier list.
          </p>
        </div>
        <Videos />
        <FeaturedTemplates />
      </div>
    </>
  )
}

export default Home
