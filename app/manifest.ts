import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Blox | AI-Powered Professional Branding',
    short_name: 'Blox',
    description: 'Unlock your professional edge with Blox. AI-powered portfolios, résumés, and branding in seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0E11',
    theme_color: '#0B0E11',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
