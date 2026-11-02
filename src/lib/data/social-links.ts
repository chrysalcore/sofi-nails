import type { IconName } from "@/components/global/icon";

export interface SocialLink {
    path: string;
    text: string;
    icon: IconName;
}

export const socialLinkList: SocialLink[] = [
    {
        path: "https://www.facebook.com/share/1Z9CNsUi1D/?mibextid=wwXIfr",
        text: "Facebook",
        icon: "facebook",
    },
    {
        path: "https://www.instagram.com/sofinailsandlashesspa?igsh=Mmp2cWoxcXltZzF3&utm_source=qr",
        text: "Instagram",
        icon: "instagram",
    },
    {
        path: "https://www.tiktok.com/@belk5?_t=ZP-8ykcsbLPDdG&_r=1",
        text: "TikTok",
        icon: "tiktok",
    },
];
