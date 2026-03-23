export default function FAQGroup({ groupName, children }: { groupName: string, children: React.ReactNode }) {
    return (
        <section className="grow basis-[min(15rem,100%)] flex flex-col gap-4">
            <h3 className='py-2 px-0 text-center border-b border-b-white'>{groupName}</h3>
            <ul className="flex flex-col gap-4">
                { children }
            </ul>
        </section>
    )
}