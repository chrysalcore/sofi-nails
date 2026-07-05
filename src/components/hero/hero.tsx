import Image from "next/image";
import HeroCTA from "./hero-cta";
import Award from "./award";
import SocialInfo from "@/components/social/social-info";
import Title from "../global/title";

export default function Hero() {
    return (
        <section className="flex flex-col place-items-center gap-24 px-4 py-48 min-h-dvh text-center bg-hero-vertical bg-center! bg-cover! overflow-clip relative bt-shape lg:flex-row lg:justify-between lg:px-[15dvw] lg:bg-hero-horizontal lg:bg-center! lg:bg-cover! lg:place-items-stretch">
            <div className="flex flex-col justify-center items-center gap-12 min-h-120">
                <div className="flex flex-row items-center gap-4 min-h-44 relative">
                    <Image className="size-38 md:size-44" src={'/icons/sofi-logo.svg'} alt="main logo" width={152} height={152} priority />
                    <Title isMainTitle />
                </div>
                <div className="flex flex-col max-w-120 tracking-widest">
                    <p className="">Where the scent of eucalyptus meets silence, and the world outside fades into soft light. Begin your journey here.</p>
                </div>
                <HeroCTA>Book Now</HeroCTA>
            </div>
            <div className="flex flex-col justify-center items-center gap-16">
                <Award />
                <SocialInfo />
            </div>
        </section>
    )
}