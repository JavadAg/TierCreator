import React from "react"

interface IProps {
  setSort: React.Dispatch<React.SetStateAction<string>>
}

const TemplateSort: React.FC<IProps> = ({ setSort }) => {
  return (
    <div className="flex justify-center w-full">
      <div className=" w-full">
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value)
          }
          defaultValue="1"
          className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-300 focus:outline-none dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
          aria-label="Default select example "
        >
          <option id="1" value="name">
            Alephbatical
          </option>
          <option value="tier_amount">Popular</option>
          <option value="created_at">Recent</option>
        </select>
      </div>
    </div>
  )
}

export default TemplateSort
