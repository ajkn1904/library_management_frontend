import { Link, Outlet } from 'react-router'
import viteLogo from '/vite.svg'
import Footer from './Footer'

function App() {
  return (
        <>
    <nav className="flex items-center gap-2 p-5 font-bold">
      <Link to="/">NAVBAR</Link>
      <Link to="/books">All Books</Link>
      <Link to="/create-book">Add Book</Link>
      <Link to="/borrow-summary">Borrow Summary</Link>

    </nav>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
