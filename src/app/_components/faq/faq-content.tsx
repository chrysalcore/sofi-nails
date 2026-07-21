"use client";

import { useState } from "react";
import { faqGroupList } from "../../_lib/data/faq";
import FAQGroup from "./faq-group";
import FAQQuestion from "./faq-question";

export default function FAQs() {
    const [selectID, setSelectID] = useState(-1);

    const isActive = (id: number) => {
        return id === selectID;
    };

    const onSelect = (id: number) => {
        setSelectID(selectID === id ? -1 : id);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {faqGroupList.map((item, id) => (
                <FAQGroup groupName={item.groupName} key={id}>
                    {item.faqList.map((qst) => (
                        <FAQQuestion
                            {...qst}
                            isActive={isActive(qst.id)}
                            onSelect={onSelect}
                            key={qst.id}
                        />
                    ))}
                </FAQGroup>
            ))}
        </div>
    );
}
