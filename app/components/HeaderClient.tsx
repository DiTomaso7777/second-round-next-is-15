'use client'

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavigationLink } from './navigation/NavigationLink';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useShoppingCart } from '../context/ShoppingCartContext';

import { getNavigationItems } from './navigation/NavigationConfig';
import { Logo } from './Logo';
import SearchForm from './SearchForm';

interface UserData {
  id: string | null;
  isAdmin: boolean;
  isSignedIn: boolean;
}

function HeaderClient({ userData }: { userData: UserData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useShoppingCart();
  const navigationItems = getNavigationItems(userData.id ?? undefined);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredNavItems = navigationItems.filter(item => {
    if (item.href === '/admin') {
      return userData.isAdmin;
    }
    return true;
  });

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo + Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {filteredNavItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  name={item.name}
                  icon={item.icon}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>
          </div>

          {/* Center section: Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <SearchForm />
          </div>

          {/* Right section: Cart + Auth */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredNavItems.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                name={item.name}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            ))}
          </div>
          <div className="px-4 py-3">
            <SearchForm />
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderClient;