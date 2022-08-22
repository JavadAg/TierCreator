import html2canvas from "html2canvas"
import { MutableRefObject } from "react"
import makeid from "./generateRanStr"

interface IDownload {
  id: MutableRefObject<HTMLElement | null>
  isSaving?: boolean
}

const downloadImage = (blob: any, fileName: any) => {
  const fakeLink = window.document.createElement("a")
  fakeLink.download = fileName
  fakeLink.href = blob
  document.body.appendChild(fakeLink)
  fakeLink.click()
  document.body.removeChild(fakeLink)
  fakeLink.remove()
}

export const downloadasImage = async ({ id, isSaving }: IDownload) => {
  const { current } = id
  const canvas = await html2canvas(current!, {
    useCORS: true,
    windowWidth: 1000,
    backgroundColor: "#000",
    scale: 1.5
  })

  const image = canvas.toDataURL("image/jpeg", 0.8)

  if (isSaving) return image
  downloadImage(image, makeid(10) + Date.now())
}
