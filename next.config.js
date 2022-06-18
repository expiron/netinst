/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/download/:mirror/:codename.iso',
      destination: '/api/iso/daily'
    },
    {
      source: '/download/release/:mirror/:codename.iso',
      destination: '/api/iso/release'
    },
    {
      source: '/download/redirect',
      destination: '/api/iso/redirect'
    },
    {
      source: '/seed/new',
      destination: '/api/seed/new'
    },
    {
      source: '/seed/:id([a-f0-9]{8})/update',
      destination: '/api/seed/update'
    },
    {
      source: '/seed/:id([a-f0-9]{8})/user-data',
      destination: '/api/seed/user-data'
    },
    {
      source: '/seed/:id([a-f0-9]{8})/:slug',
      destination: '/api/seed/get'
    },
    {
      source: '/keys/:fqdn/update',
      destination: '/api/keys/update'
    },
    {
      source: '/keys/:fqdn/:slug',
      destination: '/api/keys/get'
    }
  ]
}

module.exports = nextConfig
