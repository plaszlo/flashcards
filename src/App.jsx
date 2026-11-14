import { AllRoutes } from './routes/AllRoutes';
import { Header } from './components/Header/Header';
import './App.css'

function App() {


  return (
    <div className='min-h-screen dark:bg-slate-950'>
      <Header />
      <AllRoutes />
    </div>
  )
}

export default App
