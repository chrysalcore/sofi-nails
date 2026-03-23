import { categories } from "../../_lib/data/categories"
import CategoryShort from "./category-short"

export default function CategoriesListShort() {
    return (
        <ul className="flex gap-4 p-4 max-w-full text-dark/70 rounded-lg overflow-auto scroll-none snap-mandatory snap-center">
            {[...categories.values()].map(item => (
                    <CategoryShort {...item} key={item.name} />
            ))}
        </ul>
    )
}