import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Statistics from './components/Statistics'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  return (
    <>
      <LoadingScreen />
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Statistics />
      <Process />
      <Portfolio />
      <Testimonials />
      <Footer />
        <ScrollToTop />
    </div>
    </>
  )
}

export default App

