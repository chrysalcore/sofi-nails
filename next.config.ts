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
        ];
    },
};

export default nextConfig;
