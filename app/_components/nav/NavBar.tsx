import NavLink from './NavLink'

const NavBar = () => {
  const links: {href: string, label: string}[] = [
  ]


  return (
    <nav className='navbar px-4'>
      <div className='container mx-auto flex gap-4'>
        <div className='font-semibold text-2xl'>SkyNected</div>
        <ul className='flex flex-row gap-4'>
          {
            links.map((link, index) => <NavLink key={index} href={link.href} label={link.label} />)
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavBar