import Link from 'next/link';
import LogoStimate from './Icons/LogoStimate';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" >
              <LogoStimate width={100} height={40} />
            </Link>
          </div>
          <div className="font-comfortaa flex items-center">
            <Link href="/ayuda" className="text-[#050315] hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Ayuda
            </Link>
            <div className="ml-3">
             {/*  <ProfileDropdown /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
