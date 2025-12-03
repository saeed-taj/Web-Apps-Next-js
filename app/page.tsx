import Brand1 from '@/components/Frontend/brands'
import Hero from '@/components/Frontend/Hero'
import MegaMenu from '@/components/Frontend/megaMenu'
import Navbar from '@/components/Frontend/Navbar'
import TabbedSection from '@/components/Frontend/TabbedSection'

export default function Home() {
  return (
    <div>
      <main>
      <Navbar />
        <div className="flex justify-center mt-4 md:mt-6 px-4">
        <div className="w-full max-w-[1200px]">
          <MegaMenu />
        </div>
      </div>  
      <Hero />
      <section>
        <Brand1/>
        <TabbedSection/>
      </section>
      
    </main>
    {/*<Footer >*/}
    </div>
    
  )
}
