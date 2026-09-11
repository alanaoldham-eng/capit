import Image from "next/image"
import type { ImageSize } from "@/lib/image-size"

interface CmsImageProps {
  src: string
  alt: string
  /** Intrinsic size from getImageSize(). Optional - see the fallback below. */
  size?: ImageSize | null
  sizes: string
  priority?: boolean
  className?: string
}

/**
 * Renders a CMS-managed image at its own aspect ratio: never cropped, never
 * letterboxed.
 *
 * The old markup forced every image into a fixed box (aspect-[21/9] or a
 * hard-coded 800x400) with object-cover, which cut the top and bottom off any
 * image whose shape differed - infographic titles included.
 *
 * With a known size the browser reserves the exact box before the file loads,
 * so there is no layout shift. Without one it uses Next's documented
 * width={0} height={0} + h-auto pattern, which still shows the whole image.
 */
export function CmsImage({ src, alt, size, sizes, priority, className = "" }: CmsImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size?.width ?? 0}
      height={size?.height ?? 0}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full ${className}`}
    />
  )
}

export default CmsImage
