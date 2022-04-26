import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Navigation() {
  const router = useRouter();

  return (
    <>
      <div className="navigation">
        <div className="navigation-logo">
          <Image 
          src="/img/logo.png"
          alt="NEEDED"
          height="100"
          width="100" 
          />
        </div>
        <div className="navigation-links">
          <Link href='/'><a className={router.pathname == "/" ? "active" : ""}>Home</a></Link>
          <Link href='/Stay'><a className={router.pathname == "/Stay" ? "active" : ""}>Places to stay</a></Link>
          <Link href='/See'><a className={router.pathname == "/See" ? "active" : ""}>Places to see</a></Link>
          <Link href='/Contact'><a className={router.pathname == "/Contact" ? "active" : ""}>Contact</a></Link>
        </div>
      </div>
    </>
  )
}

export default Navigation