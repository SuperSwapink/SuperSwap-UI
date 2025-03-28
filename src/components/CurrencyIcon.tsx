import { DEFAULT_IMAGE_URL } from "@/constants"
import Image from "next/image"
import { useEffect, useState } from "react"

interface CurrencyIconProps {
  src: string
  width: number
  height: number
  alt?: string
  className?: string
}

const CurrencyIcon: React.FC<CurrencyIconProps> = ({
  src,
  width,
  height,
  alt,
  className,
}) => {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  const handleError = () => {
    setImageSrc(DEFAULT_IMAGE_URL)
  }

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      alt={alt ?? ""}
      onError={handleError}
      className={className ?? ""}
    />
  )
}

export default CurrencyIcon
