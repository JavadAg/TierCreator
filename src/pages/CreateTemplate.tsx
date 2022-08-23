import CreateTemplateForm from "../components/CreateTemplateForm/CreateTemplateForm"

const CreateTemplate = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center w-full rounded-xl space-y-2 bg-white">
      <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl">
        <span className="text-lg font-bold text-gray-700">
          Create a Template
        </span>
        <p className="text-sm text-start text-gray-600">
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
