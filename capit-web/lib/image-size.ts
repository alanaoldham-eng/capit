import path from "path"
import sharp from "sharp"

export type ImageSize = { width: number; height: number }

const PUBLIC_DIR = path.join(process.cwd(), "public")

/**
 * Intrinsic pixel size of an image under /public, read on the server.
 *
 * Server-only: this imports sharp and reads the filesystem, so never import it
 * from a client component. Returns null for remote URLs, paths that escape
 * /public, missing files, or anything sharp cannot parse. Callers fall back to
 * an auto-height render in that case, which still never crops.
 */
export async function getImageSize(src?: string | null): Promise<ImageSize | null> {
  if (!src || !src.startsWith("/") || src.startsWith("//")) return null
  try {
    const file = path.join(PUBLIC_DIR, decodeURIComponent(src.split("?")[0]))
    if (!file.startsWith(PUBLIC_DIR + path.sep)) return null
    const { width, height } = await sharp(file).metadata()
    return width && height ? { width, height } : null
  } catch {
    return null
  }
}

/** Sizes for every non-empty src, keyed by src. Unmeasurable images are omitted. */
export async function getImageSizes(
  srcs: Array<string | null | undefined>
): Promise<Record<string, ImageSize>> {
  const unique = Array.from(
    new Set(srcs.filter((s): s is string => typeof s === "string" && s.trim().length > 0))
  )
  const entries = await Promise.all(unique.map(async (s) => [s, await getImageSize(s)] as const))
  return Object.fromEntries(
    entries.filter((entry): entry is readonly [string, ImageSize] => entry[1] !== null)
  )
}
