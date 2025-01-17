


import { auth, currentUser } from '@clerk/nextjs/server';
import HeaderClient from './HeaderClient';

async function Header() {
  const user = await currentUser();
  const { userId } = await auth()
  
  const userData = {
    id: userId,
    isAdmin: user?.primaryEmailAddress?.emailAddress === 'movietime3018@gmail.com',
    isSignedIn: !!userId
  };

  return <HeaderClient userData={userData} />;
}

export default Header;