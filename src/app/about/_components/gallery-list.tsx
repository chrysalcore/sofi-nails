import Image from "next/image";
import { galleryPhotos } from "../lib/data/gallery-photos";

export default function GalleryList() {
    return (
        <ul className="grid grid-flow-dense auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo) => (
                <li className="overflow-clip rounded-lg" key={photo}>
                    <Image
                        className="h-full w-full object-cover"
                        src={`/imgs/${photo}`}
                        alt={photo}
                        width={340}
                        height={240}
                    />
                </li>
            ))}
        </ul>
    );
}
