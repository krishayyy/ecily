import type { Metadata } from "next"
import { galleryFonts } from "../fonts"
import GalleryAdmin from "./GalleryAdmin"

export const metadata: Metadata = {
  title: "Gallery review | Ecily",
  robots: { index: false, follow: false },
}

export default function GalleryAdminPage() {
  return (
    <div className={galleryFonts}>
      <GalleryAdmin />
    </div>
  )
}
