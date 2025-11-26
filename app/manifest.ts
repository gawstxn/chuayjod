import { APP_CONFIG } from '@/config/app'
import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_CONFIG.name,
    short_name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b05',
    theme_color: '#09090b05',
    icons: [
      {
        src: '/waguriIcon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/waguriIcon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
