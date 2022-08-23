import React, { useState } from "react"
import { TbSettings } from "react-icons/tb"

export const colorPickerOptions = [
  "#FF7F7F",
  "#FFBF7F",
  "#FFDF7F",
  "#FFFF7F",
  "#BFFF7F",
  "#7FFFFF",
  "#7FBFFF",
  "#7F7FFF",
  "#FF7FFF",
  "#BF7FBF",
  "#3B3B3B",
  "#858585",
  "#CFCFCF",
  "#F7F7F7"
]

const ContainerEditModal = ({
  index,
  fieldLabel,
  setLabelColor,
  setFieldLabel
}: any) => {
  const handleColor = (
    e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    setLabelColor(e.currentTarget.value)
  }

  const handleLabelChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFieldLabel(e.target.value)
  }

  return (
    <div>
      <button
        className="w-full flex border-b border-customgrey-220 p-1 justify-center items-center hover:bg-indigo-200/50 h-full duration-200"
        data-bs-toggle="modal"
        data-bs-target={`#settingsModal${index}`}
      >
        <TbSettings />
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id={`settingsModal${index}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 p-4 border-b border-gray-200 rounded-t-md ">
              <h5
                className="text-lg font-medium leading-normal text-gray-800 "
                id="exampleModalLabel"
              >
                {fieldLabel}
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4 flex flex-col justify-center items-center flex-wrap">
              <span>Choose a Label Background Color:</span>
              <div className="flex justify-center items-center flex-wrap">
                {colorPickerOptions.map((item: any, index: number) => (
                  <button
                    key={index}
                    value={item}
                    onClick={handleColor}
                    style={{ backgroundColor: item }}
                    className={`m-2 py-4 px-4  rounded-full`}
                  ></button>
                ))}
              </div>
              <span className="mt-4">Edit Label Text:</span>
              <input
                onChange={handleLabelChange}
                type="text"
                className="border-2 w-9/12 border-slate-200 rounded-lg px-2 py-1"
                placeholder={fieldLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerEditModal
