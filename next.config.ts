import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    async redirects() {
        return [
            {
                source: "/services",
                destination: "/services/nails",
                permanent: true,
            },
            {
                source: "/services/browns",
                destination: "/services/brows",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
