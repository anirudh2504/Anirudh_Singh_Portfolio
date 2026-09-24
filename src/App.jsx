import Backdrop from './components/Backdrop'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import StyleDock from './components/StyleDock'
import ChatWidget from './components/ChatWidget'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Backdrop />
      <Header />
      <main className="wrap" id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </main>
      <ChatWidget />
      <StyleDock />
    </>
  )
}
