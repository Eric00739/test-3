import { createPageMetadata } from "@/lib/metadata"
import { Remote433PageContent } from "./Remote433PageContent"

const breadcrumbItems = [
  { name: "Home", url: "https://www.fastfunrc.com/" },
  { name: "Accessories", url: "https://www.fastfunrc.com/accessories/" },
  { name: "Remotes", url: "https://www.fastfunrc.com/accessories/remotes/" },
  { name: "433MHz 4-Button Remote", url: "https://www.fastfunrc.com/accessories/remotes/433mhz-4-button/" },
]

export const metadata = createPageMetadata({
  title: "433MHz 4-Button RF Remote | FastFunRC",
  description:
    "Order the FastFunRC 433MHz 4-button remote with custom protocol support, matched receivers, and CE/FCC/RoHS certification packages.",
  path: "/accessories/remotes/433mhz-4-button/",
})

export default function Remote433Page() {
  return <Remote433PageContent breadcrumbItems={breadcrumbItems} />
}
