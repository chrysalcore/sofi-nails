"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/global/icon";
import { inputsList } from "../../_lib/data/inputs";
import { sendEmail, type ReservationState } from "../../_lib/helper/actions";
import { AppointmentCard } from "./appointment-card";
import Input from "./input";

const initialState: ReservationState = { status: "idle" };

function Form() {
    const [state, action, isLoading] = useActionState(sendEmail, initialState);
    const searchParams = useSearchParams();
    const defaultSubject = searchParams.get("subject") ?? "";

    if (state.status === "sent") {
        return <AppointmentCard reservation={state.reservation} />;
    }

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
            {state.status === "error" && (
                <p className="bg-danger/10 border-danger/60 text-danger flex justify-center rounded-lg border p-4 text-center">
                    {state.error}
                </p>
            )}
        </form>
    );
}

export default Form;
