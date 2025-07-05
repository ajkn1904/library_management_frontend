import { Link, Outlet } from 'react-router'
import Logo from './assets/logo.svg'

import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import NavDropDown from './pages/modules/NavDropDown';

function App() {
  return (
    <>
      <nav className="flex justify-between items-center gap-2 p-5 text-md sm:text-lg md:text-xl font-bold">
        <Link to="/" className='text-xl md:text-4xl flex items-center text-blue-600'><img src={Logo} alt="Logo" className="h-12 w-12" />MyLiBrArY</Link>
        
        <div className="hidden lg:flex gap-3 lg:gap-5">
          <Link className='hover:text-blue-500' to="/books">All Books</Link>
          <Link className='hover:text-blue-500' to="/create-book">Add Book</Link>
          <Link className='hover:text-blue-500' to="/borrow-summary">Borrow Summary</Link>
        </div>

        <div className="lg:hidden">
          <NavDropDown />
        </div>

      </nav>
      <ToastContainer position="top-center" theme='colored' />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
