import React from "react"

interface IProps {
  title: string
  description: string
  extraDescription?: string
}

const PageDescription: React.FC<IProps> = ({
  title,
  description,
  extraDescription
}) => {
  return (
    <div className="flex justify-center items-center flex-col space-y-2 bg-indigo-200 p-2 rounded-xl divide-y divide-gray-400 md:px-5 md:py-4 lg:px-20 xl:space-y-4 w-full text-center">
      <span className="font-bold text-lg text-gray-800 md:text-xl w-full">
        {title}
      </span>
      <p className="text-sm text-gray-700 pt-2 md:text-[.9rem] w-full">
        {description}
      </p>
      {extraDescription && (
        <p className="text-sm text-gray-700 pt-2 md:text-[.9rem]">
          {extraDescription}
        </p>
      )}
    </div>
  )
}

export default PageDescription
