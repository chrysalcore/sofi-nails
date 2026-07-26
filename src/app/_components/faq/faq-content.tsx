import { faqGroupList } from "../../_lib/data/faq";
import FAQGroup from "./faq-group";
import FAQQuestion from "./faq-question";

export default function FAQs() {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {faqGroupList.map((item) => (
                <FAQGroup groupName={item.groupName} key={item.groupName}>
                    {item.faqList.map((qst) => (
                        <FAQQuestion {...qst} key={qst.id} />
                    ))}
                </FAQGroup>
            ))}
        </div>
    );
}
