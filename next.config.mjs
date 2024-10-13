/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.korben.cc",
            },
        ],
    },
};

export default nextConfig;
