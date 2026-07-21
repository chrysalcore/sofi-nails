export default function FAQGroup({
    groupName,
    children,
}: {
    groupName: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex grow basis-[min(15rem,100%)] flex-col gap-4">
            <h3 className="border-b border-b-white px-0 py-2 text-center">
                {groupName}
            </h3>
            <ul className="flex flex-col gap-4">{children}</ul>
        </section>
    );
}
