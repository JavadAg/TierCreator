import React, { useState } from "react"

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
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Name of Template</h1>
        <input
          type="text"
          maxLength={50}
          placeholder="Describe the Template Name"
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
        />
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <label className="text-xl font-bold" htmlFor="cars">
          Select a Category:
        </label>
        <select
          className="rounded-md p-1 focus-within:outline-indigo-300 w-9/12"
          name="cars"
          id="cars"
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Description of Template:</h1>
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="Description of the Template"
        />
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Select Template Cover Photo:</h1>
        <input type="file" />
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">
          Upload a Set of Images for the Tier List Template:
        </h1>
        <p>
          Consistent image size and orientation (square, portrait or landscape)
          work best. You can use our Text to Image Generator to quickly add text
          labels on your images. Large file sizes may cause the upload to fail.
          A minimum of 2 images are needed to make a template.
        </p>
        <input type="file" />
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Add a URL for Image Credits:</h1>
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="Url of Site"
        />
      </div>
      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Image Orientation</h1>
        <select
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          name="imageOrientation"
        >
          <option id="1">Square</option>
          <option id="1">Landscape</option>
          <option id="1">Portrait</option>
          <option id="1">Circle</option>
        </select>
      </div>

      <div className="flex justify-center items-start flex-col space-y-1 w-full">
        <h1 className="text-xl font-bold">Default Row Label Text:</h1>
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="s"
        />
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="a"
        />
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="b"
        />
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="c"
        />
        <input
          className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
          type="text"
          placeholder="d"
        />
      </div>
      <div id="accordionExample" className="w-full accordion">
        <div className="accordion-item ">
          <h2 className="accordion-header mb-0" id="headingOne">
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              className="font-bold text-xl"
            >
              Extra Rows
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body space-y-1 flex justify-center items-start flex-col">
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 6"
              />
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 7"
              />
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 8"
              />
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 9"
              />
              <input
                className="border border-zinc-300 w-9/12 p-1 rounded-md focus-visible:outline-indigo-300"
                type="text"
                placeholder="Row 10"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="bg-zinc-100 py-1 px-3 hover:bg-zinc-200 duration-200 rounded-md font-bold">
        Submit
      </button>
    </div>
  )
}

export default Create
