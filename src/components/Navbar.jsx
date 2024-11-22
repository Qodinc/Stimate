import Link from 'next/link';
import LogoStimate from './Icons/LogoStimate';
import DropdownProfile from './DropdownProfile';
import { ArrowBigLeft } from 'lucide-react';
import DashboardButton from './DashboardButton';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow sticky top-0 left-0 right-0 z-50">
        <div className="flex justify-between h-[85px] px-4 md:px-14 lg:px-20">
          <div className="flex-shrink-0 flex items-center">
          <Link href="/" >
            <LogoStimate width={50} height={40} />
            </Link>
            <DashboardButton />

          </div>
          
          <div className="font-comfortaa flex items-center ">
            <div>
              <DropdownProfile />
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
