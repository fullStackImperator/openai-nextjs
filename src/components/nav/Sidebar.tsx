'use client'

import { menu } from '@/data/Menu'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiCog, BiHome, BiListUl, BiPlus } from 'react-icons/bi'

export default function Sidebar() {
  const { user } = useUser()
  const currentRoute = usePathname()

  function getIcon(icon: string) {
    switch (icon) {
        case "list":
            return <BiListUl/>
            case "plus":
                return <BiPlus/>
                case "cog":
                    return <BiCog/>
                    default:
                        return <BiHome/>
    }
  }

  return user ? (
    <div className="bg-wite border border-gray-100 py-2 flex flex-shrink-0 flex-row justify-around md:justify-start md:flex-col md:h-full md:w-32 z-10">
      {/* <div>Sidebar</div> */}
      {menu.map((item, index) => (
        <Link
          href={item.route}
          key={index}
          className="flex flex-row items-center relative hover:bg-indigo-50 px-4 py-2 cursor-pointer group rounded-lg"
        >
          <div className="flex flex-row items-center">
            
            {currentRoute === item.route && (
              <div className="absolute h-full w-2 hidden md:block bg-indigo-600 rounded-full -left-1"></div>
            )}
            {currentRoute === item.route && (
              <div className="absolute h-2 w-full block md:hidden bg-indigo-600 rounded-full -top-3 left-0"></div>
            )}

            <span className="text-gray-500 text-xl group-hover:text-indigo-600">
              {getIcon(item.icon)}
            </span>
            <span className="ml-2 text-gray-500 text-xl group-hover:text-indigo-600">
              {item.text}
            </span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className='md:mr-32'></div>
  )
}
