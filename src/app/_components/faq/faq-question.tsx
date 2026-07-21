"use client";

import { type FAQ } from "../../_lib/data/faq.js";

export default function FAQQuestion({
    id,
    question,
    answer,
    list,
    note,
    isActive,
    onSelect,
}: FAQ & { isActive: boolean; onSelect: (id: number) => void }) {
    return (
        <li className="bg-faq flex flex-col gap-2 rounded-xl p-4">
            <button
                className="relative flex justify-between gap-4 text-left font-semibold text-inherit"
                onClick={() => onSelect(id)}
            >
                <span className={`line-clamp-1 ${isActive && "line-clamp-2"}`}>
                    {question}
                </span>
                <svg
                    className={`min-w-4 -rotate-90 fill-white transition-transform ${isActive && "rotate-90"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    height={16}
                    width={16}
                    viewBox="0 -960 960 960"
                >
                    <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z" />
                </svg>
            </button>
            <div
                className={`bg-secondary/25 flex max-h-0 flex-col gap-2 overflow-clip rounded-lg p-0 text-sm transition-all ${isActive && "max-h-52 p-2"}`}
            >
                {answer && <p>{answer}</p>}
                {list && (
                    <ul className="list-disc">
                        {list.map((li) => (
                            <li className="list-inside list-disc" key={li}>
                                {li}
                            </li>
                        ))}
                    </ul>
                )}
                {note && <strong className="faq-list__text">{note}</strong>}
            </div>
        </li>
    );
}
