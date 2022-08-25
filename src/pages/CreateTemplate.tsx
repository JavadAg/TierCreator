import CreateTemplateForm from "../components/CreateTemplateForm/CreateTemplateForm"
import PageDescription from "../components/PageDescription/PageDescription"

const CreateTemplate = () => {
  return (
    <div className="space-y-2 flex justify-center items-center flex-col text-center w-full md:space-y-4">
      <PageDescription
        title="Create a Template"
        description="TierCreator lets you easily create a tier list template for anything.
          By using TierCreator, you agree to follow our Guidelines and our Terms
          of Use. If you are having troubles, refer to our template creation
          guide and FAQ."
      />
      <CreateTemplateForm />
    </div>
  )
}

export default CreateTemplate
