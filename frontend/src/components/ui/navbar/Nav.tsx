'use client'
import React from 'react';
import Link from 'next/link';

function Nav() {
  return (
    <div className="navbar">
        <div className="navbar-start">
            <a className="navbar-item">Omegle Clone</a>
        </div>
        <div className="navbar-end">
            <Link className="navbar-item" href={'/'}>Home</Link>
            <Link className="navbar-item" href={'/history'}>History</Link>
        </div> 
    </div>
  )
}

export default Nav