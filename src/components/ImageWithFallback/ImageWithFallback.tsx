import React, { useState } from "react"
interface IProps {
  fallback?: string
  src: string
  className: string
  alt?: string
}

const ImageWithFallback: React.FC<IProps> = ({
  fallback,
  src,
  className,
  alt
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = () => setImgSrc(fallback)

  return (
    <img
      loading="lazy"
      className={className}
      src={imgSrc ? imgSrc : fallback}
      onError={onError}
      alt={alt}
    />
  )
}

export default ImageWithFallback
