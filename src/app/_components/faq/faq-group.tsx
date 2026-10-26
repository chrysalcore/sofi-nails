export default function FAQGroup({
    groupName,
    children,
}: {
    groupName: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex grow basis-[min(15rem,100%)] flex-col gap-6">
            <h3 className="flex min-h-14 items-end border-b border-white/40 py-2 text-sm font-medium tracking-widest text-balance text-white/85 uppercase">
                {groupName}
            </h3>
            <ul className="flex flex-col gap-6">{children}</ul>
        </section>
    );
}
