import NavLinks from './NavLinks'
import UserLinks from './UserLinks'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">

      <Link to="/">
        <div className='text-3xl font-extrabold text-gray-900 dark:text-white'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r to-yellow-600 from-red-400'>
                Dev-Hub
            </span>{" "}
            App
        </div>
      </Link>
      
      <div className="flex justify-center items-center mx-auto">
      <NavLinks />
      </div>
      
      <UserLinks />
    </div>
  )
}

export default NavBar