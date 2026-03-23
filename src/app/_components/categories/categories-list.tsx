import Category from './category'
import { categories } from '../../_lib/data/categories'

export default function CategoriesList() {
    const categoriesList = [...categories.values()]

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {categoriesList.map((value) => <Category {...value} key={value.path} />)}
            </ul>
            <div className='self-stretch flex flex-col p-8 items-center text-center bg-main/15 border border-main/30 rounded-2xl'>
                <h3 className='text-main font-semibold text-xl uppercase'>Important!</h3>
                <strong className='text-main/80 font-normal max-w-160'>Please note that all hair removal prices listed are per session, and multiple sessions are typically required for optimal results; package discounts are available for commitments of 6 or more sessions, and a complimentary consultation is recommended before your first treatment.</strong>
            </div>
        </>
    )
}