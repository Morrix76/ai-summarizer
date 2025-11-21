import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '@/components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Summarizer - Riassunti Intelligenti',
  description: 'Genera riassunti AI professionali con 6 template specializzati',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <I18nProvider>
            {children}
          </I18nProvider>
        </div>
      </body>
    </html>
  )
}

