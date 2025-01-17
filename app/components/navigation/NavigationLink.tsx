import Link from "next/link";

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

interface NavigationLinkProps {
  href: string;
  icon: string;
  name: string;
  isActive: boolean;
  authRequired?: boolean;
}

export function NavigationLink({ href, icon, name, isActive, authRequired = false }: NavigationLinkProps) {



  const linkContent = (
    <Link 
      href={href}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
        hover:bg-gray-100 hover:scale-105
        ${isActive ? 'bg-gray-100 font-semibold shadow-sm' : ''}
      `}
    >
      <div 
        className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
        dangerouslySetInnerHTML={{ __html: icon }} 
      />
      <span className={isActive ? 'text-blue-600' : 'text-gray-600'}>
        {name}
        
      </span>
    </Link>
  );

  if (href === '/sign-in') {
    return (
      <SignInButton mode="modal">
        <button className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-all
          hover:bg-gray-100 hover:scale-105 w-full text-left
          ${isActive ? 'bg-gray-100 font-semibold shadow-sm' : ''}
        `}>
          <div 
            className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
            dangerouslySetInnerHTML={{ __html: icon }} 
          />
          <span className={isActive ? 'text-blue-600' : 'text-gray-600'}>
            {name}
          </span>
        </button>
      </SignInButton>
    );
  }

  if (authRequired) {
    return <SignedIn>{linkContent}</SignedIn>;
  }

  return linkContent;
}