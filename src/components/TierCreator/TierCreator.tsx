import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Template } from "../../models/tier"
import { useDrag, useDrop } from "react-dnd"
import ImageList from "./ImageList"

interface LocationState {
  template: Template
}

const TierCreator = () => {
  const { state } = useLocation()

  const template = state as Template

  console.log(template.image.indexOf(2))

  const [board, setBoard] = useState<string[]>([""])

  /*  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImage(key)
  })) */

  /*  const addImage = (key) => {} */

  return (
    <>
      <div className="w-full max-w-[1200px] bg-red-200">
        <div className="flex justify-start items-center w-full min-h-[80px]">
          <div className="bg-blue-200 min-w-[80px] h-full min-h-[80px] flex justify-center items-center">
            {template.rowOne}
          </div>
          <div className="bg-zinc-400 w-full min-h-[80px] flex justify-center items-center">
            {board.map((image: string) => (
              <img src={image} alt="image" />
            ))}
          </div>
          <div className="w-10 flex justify-center items-center bg-green-200 min-h-[80px]">
            b
          </div>
          <div className="w-10 flex justify-center items-center bg-emerald-300 min-h-[80px]">
            <button>t</button>
            <button>B</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        {template.image.map((image, index) => (
          <ImageList src={image} key={index} />
        ))}
      </div>
    </>
  )
}

export default TierCreator
