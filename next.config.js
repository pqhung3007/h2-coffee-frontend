/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'product.hstatic.net',
            },
        ],
    }
}

module.exports = nextConfig
