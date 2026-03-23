import Image from "next/image";
import { galleryPhotos } from "../lib/data/gallery-photos";

export default function GalleryList() {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] grid-flow-dense gap-4">
            {galleryPhotos.map((photo) => (
                <li className="rounded-lg overflow-clip" key={photo}>
                    <Image className="w-full h-full object-cover" src={`/imgs/${photo}`} alt={photo} width={240} height={192} />
                </li>
            ))}
        </ul>
    )
}