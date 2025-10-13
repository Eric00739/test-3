const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const trimmedBasePath = rawBasePath.replace(/\/$/, "")
const basePath =
  trimmedBasePath && !trimmedBasePath.startsWith("/") ? `/${trimmedBasePath}` : trimmedBasePath

/**
 * Prefix static asset paths with NEXT_PUBLIC_BASE_PATH when the app exports under a subdirectory.
 */
export function getAssetPath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  if (!basePath || basePath === "/") {
    return normalizedPath
  }
  return `${basePath}${normalizedPath}`
}
