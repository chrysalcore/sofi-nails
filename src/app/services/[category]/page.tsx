import { Metadata, ResolvingMetadata } from "next"
import Service from "./_components/service"
import { serviceList } from "@/app/_lib/data/services"
import { categories } from "@/app/_lib/data/categories"
import { serviceKeywords } from "@/app/_lib/keywords"

type Props = { 
    params: Promise<{ category: string }> 
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { category: path } = await params
    const metaParent = await parent
    const category = categories.get(path)

    return {
        title: `${category?.title} | ${metaParent.title?.absolute.split('|')[1]}`,
        description: category?.desc,
        keywords: serviceKeywords[path],
        openGraph: {
            title: `${category?.title} | ${metaParent.title?.absolute.split('|')[1]}`,
            description: category?.desc,
            url: `https://sofinailsandlashesspa.com/services/${path}`,
            siteName: 'Sofi Nails & Lashes Spa',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category?.title} | ${metaParent.title?.absolute.split('|')[1]}`,
            description: category?.desc,
        },
    }
}

export default async function ServicePage({ params }: Props) {
    const { category } = await params


    const services = serviceList.find(item => item.category.path === category)?.services

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4">
            {services?.map(item => (
                <Service {...item} key={item.info[0].name} />
            ))}
        </ul>
    )
}