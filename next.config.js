/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "ru",
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
        };
        return config;
    },
};

module.exports = nextConfig;
