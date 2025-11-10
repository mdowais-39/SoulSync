import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mood-based pastel color schemes
        normal: {
          light: '#F0F4FF',
          DEFAULT: '#A5B4FC',
          dark: '#6366F1',
          gradient: 'from-indigo-100 via-purple-50 to-pink-100',
        },
        depression: {
          light: '#F5F5F7',
          DEFAULT: '#9CA3AF',
          dark: '#6B7280',
          gradient: 'from-gray-100 via-slate-100 to-zinc-100',
        },
        suicidal: {
          light: '#FFF1F2',
          DEFAULT: '#FDA4AF',
          dark: '#E11D48',
          gradient: 'from-rose-100 via-pink-100 to-red-100',
        },
        anxiety: {
          light: '#E0F2FE',
          DEFAULT: '#7DD3FC',
          dark: '#0EA5E9',
          gradient: 'from-sky-100 via-cyan-100 to-blue-100',
        },
        bipolar: {
          light: '#FAF5FF',
          DEFAULT: '#D8B4FE',
          dark: '#A855F7',
          gradient: 'from-purple-100 via-violet-100 to-fuchsia-100',
        },
        stress: {
          light: '#FEF3C7',
          DEFAULT: '#FCD34D',
          dark: '#F59E0B',
          gradient: 'from-amber-100 via-yellow-100 to-orange-100',
        },
        personality: {
          light: '#E0E7FF',
          DEFAULT: '#A5B4FC',
          dark: '#4F46E5',
          gradient: 'from-indigo-100 via-blue-100 to-purple-100',
        },
      },
    },
  },
  plugins: [],
}
export default config
