import { AllRoutes } from './routes/AllRoutes';
import { Header } from './components/Header';
import './App.css'

function App() {


  return (
    <div className='min-h-screen dark:bg-black'>
      <Header />
      <AllRoutes />
    </div>
  )
}

export default App
