
import './App.css'
import Navbar from './navbar/Navbar'
import Footer from './pages/Footer'
import Quiz from './pages/Quiz'
import Allroutes from './routes/Allroutes'

function App() {


  return (
    <>
      <Navbar />
      <Allroutes /> 
      <Quiz/>
      <Footer/>
    </>
  )
}

export default App
