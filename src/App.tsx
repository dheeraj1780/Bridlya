import { Navigation } from './components/navigation/Navigation'
import { ScrollProgress } from './components/navigation/ScrollProgress'
import { Hero } from './components/hero/Hero'
import { BrandStatement } from './components/storytelling/BrandStatement'
import { ChapterStage } from './components/storytelling/ChapterStage'
import { PromiseStatement } from './components/storytelling/PromiseStatement'
import { FinalMoment } from './components/storytelling/FinalMoment'
import { Ecosystem } from './components/ecosystem/Ecosystem'
import { EndToEnd } from './components/services/EndToEnd'
import { Traditions } from './components/weddingJourney/Traditions'
import { DayExperience } from './components/weddingJourney/DayExperience'
import { People } from './components/family/People'
import { Families } from './components/family/Families'
import { Partners } from './components/partner/Partners'
import { Trust } from './components/trust/Trust'
import { Future } from './components/future/Future'
import { Contact } from './components/contact/Contact'
import { Footer } from './components/footer/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <Hero />
        <BrandStatement />
        <ChapterStage />
        <Ecosystem />
        <EndToEnd />
        <Traditions />
        <DayExperience />
        <People />
        <PromiseStatement />
        <Families />
        <Partners />
        <Trust />
        <Future />
        <FinalMoment />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
