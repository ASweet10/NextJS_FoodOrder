import { Poppins } from 'next/font/google'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { AppProvider } from '@/components/AppContext'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className='max-w-6xl mx-auto p-4'>
          <AppProvider>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
