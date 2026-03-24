import { categories } from "@/app/_lib/data/categories"
import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = {
    width: 288,
    height: 115.2
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
    const { category: path } = await params
    const category = categories.get(path)
    const image = await readFile(join(process.cwd(), `public/imgs/${category?.img}`), 'base64')

    return new ImageResponse((
        <div className="flex w-72 overflow-clip aspect-5/2 bg-white">
            <img src={`data:image/png;base64,${image}`} alt={`${category?.name} image`} width={288} height={115.2} />
        </div>
    ))
}