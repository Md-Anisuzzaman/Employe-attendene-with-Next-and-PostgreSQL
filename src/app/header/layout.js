import Link from "next/link"


const layout = ({children}) => {
  return (
    <div>
      <ul className="bg-sky-500 h-10 flex gap-10 justify-center items-center">
        <li><Link className="text-white p-2" href='/header/navbar'>Navbar</Link></li>
        <li><Link className="text-white p-2" href='/header/banner'>Banner</Link></li>
      </ul>
      {children}
    </div>
  )
}

export default layout