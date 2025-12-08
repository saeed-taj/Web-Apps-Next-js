import Brand1 from '@/components/Frontend/brands'
import Hero from '@/components/Frontend/Hero'
import MegaMenu from '@/components/Frontend/megaMenu'
import Navbar from '@/components/Frontend/Navbar'
import TabbedSection from '@/components/Frontend/TabbedSection'

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main>
        <Navbar />
        <Hero />
        <div className="flex justify-center -mt-8 md:-mt-12 px-4">
          <div className="w-full max-w-[1200px]">
            <MegaMenu />
          </div>
        </div>
        <section className="max-w-6xl mx-auto px-4 space-y-12 py-12">
          <Brand1 />
          <TabbedSection />
        </section>
      </main>
    </div>
  )
}
