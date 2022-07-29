import React, { useState } from "react"
import CreateForm from "../components/CreateForm/CreateForm"

const Create = () => {
  const [showExtra, setShowExtra] = useState(false)
  return (
    <div className="flex flex-col justify-center items-start w-full mx-24 bg-gradient-to-br from-indigo-300 to-purple-300 p-4 rounded-xl space-y-5">
      <div className="flex justify-center items-start flex-col space-y-1">
        <h1 className="text-4xl font-bold">Create a Template</h1>
        <p>
          TierMaker lets you easily create a tier list template for anything. By
          using TierMaker, you agree to follow our Guidelines and our Terms of
          Use. If you are having troubles, refer to our template creation guide
          and FAQ.
        </p>
      </div>
      <CreateForm />
    </div>
  )
}

export default Create
