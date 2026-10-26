"use client";

import { Icon } from "@/components/global/icon";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { inputsList } from "../../_lib/data/inputs";
import { sendEmail } from "../../_lib/helper/actions";
import Input from "./input";

const initialState = { success: false, error: null };

function Form() {
    const [state, action, isLoading] = useActionState(sendEmail, initialState);
    const searchParams = useSearchParams();
    const defaultSubject = searchParams.get("subject") ?? "";

    return (
        <form
            className="text-secondary bg-secondary/25 grid w-full grow basis-[min(15rem,100%)] grid-cols-1 gap-4 self-start rounded-lg p-4"
            action={action}
        >
            {inputsList.map((item) => (
                <Input
                    {...item}
                    key={`${item.name}`}
                    defaultValue={
                        item.name === "subject" ? defaultSubject : undefined
                    }
                />
            ))}
            <button
                disabled={isLoading}
                className="button bg-main flex items-center justify-center gap-2 rounded-2xl text-white"
                type="submit"
            >
                {isLoading ? "Submitting" : "Submit"}
                <Icon name="send" className="size-5" />
            </button>
            {state.error && (
                <p className="bg-danger/10 border-danger/60 text-danger flex justify-center rounded-lg border p-4 text-center">
                    {state.error}
                </p>
            )}
            {state.success && (
                <p className="border-success/60 bg-success/10 text-success flex justify-center rounded-lg border p-4 text-center">
                    Email sent successfully
                </p>
            )}
        </form>
    );
}

export default Form;
