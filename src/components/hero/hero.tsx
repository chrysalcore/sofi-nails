import Image from "next/image";
import HeroCTA from "./hero-cta";
import Award from "./award";
import SocialInfo from "@/components/social/social-info";
import Title from "../global/title";

export default function Hero() {
    return (
        <section className="bg-hero-vertical bt-shape lg:bg-hero-horizontal relative flex min-h-dvh flex-col place-items-center gap-24 overflow-clip bg-cover! bg-center! px-4 py-48 text-center lg:flex-row lg:place-items-stretch lg:justify-between lg:bg-cover! lg:bg-center! lg:px-[15dvw]">
            <div className="flex min-h-120 flex-col items-center justify-center gap-12">
                <div className="relative flex min-h-44 flex-row items-center gap-4">
                    <Image
                        className="size-38 md:size-44"
                        src={"/icons/sofi-logo.svg"}
                        alt="main logo"
                        width={152}
                        height={152}
                        priority
                    />
                    <Title isMainTitle />
                </div>
                <div className="flex max-w-120 flex-col tracking-widest">
                    <p className="">
                        Where the scent of eucalyptus meets silence, and the
                        world outside fades into soft light. Begin your journey
                        here.
                    </p>
                </div>
                <HeroCTA>Book Now</HeroCTA>
            </div>
            <div className="flex flex-col items-center justify-center gap-16">
                <Award />
                <SocialInfo />
            </div>
        </section>
    );
}
