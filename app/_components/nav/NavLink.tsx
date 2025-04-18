'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string
  label: string
}

const NavLink = ({ href, label }: Props) => {
  const currentPath = usePathname()


  return (
    <li><Link className={'nav-link' + (currentPath === href ? ' nav-link-active' : '')} href={ href }>{ label }</Link></li>
  )
}

export default NavLink