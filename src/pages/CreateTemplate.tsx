import CreateTemplateForm from "../components/CreateTemplateForm/CreateTemplateForm"

const CreateTemplate = () => {
  return (
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4">
        <span className="font-bold text-lg text-gray-800 md:text-xl">
          Create a Template
        </span>
        <p className="text-sm text-start text-gray-700 pt-2 md:text-[.9rem]">
          TierCreator lets you easily create a tier list template for anything.
          By using TierCreator, you agree to follow our Guidelines and our Terms
          of Use. If you are having troubles, refer to our template creation
          guide and FAQ.
        </p>
      </div>
      <CreateTemplateForm />
    </div>
  )
}

export default CreateTemplate
