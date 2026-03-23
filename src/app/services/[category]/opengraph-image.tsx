import { categories } from "@/app/_lib/data/categories"
import Image from "next/image"
import { ImageResponse } from "next/og"

export const size = {
    width: 288,
    height: 115.2
}

export const contentType = 'image/png'

export default async function image({ params }: { params: Promise<{ category: string }> }) {
    const { category: path } = await params
    const category = categories.get(path)

    return new ImageResponse((
        <Image src={`/imgs/${category?.img}`} alt={`${category?.name} image`} width={288} height={115.2} />
    ))
}