import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shahu Kosamkar',
    short_name: 'Shahu',
    description: 'Web Developer • Content Creator • Future IT Professional',
    icons: [{ src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' }],
    theme_color: '#6366F1',
    background_color: '#ffffff',
    display: 'standalone'
  };
}