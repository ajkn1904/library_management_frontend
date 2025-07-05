import { Link, Outlet } from 'react-router'
import Logo from './assets/logo.svg'

import Footer from './Footer'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <nav className="flex justify-between items-center gap-2 p-5 text-md sm:text-lg md:text-xl font-bold">
        <Link to="/" className='flex items-center text-purple-600'><img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" /> MyLiBrArY</Link>

        <div className='flex gap-3 lg:gap-5'>
          <Link to="/books">AllBooks</Link>
          <Link to="/create-book">AddBook</Link>
          <Link to="/borrow-summary">BorrowSummary</Link>
        </div>

      </nav>
      <ToastContainer position="top-center" theme='colored' />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
