import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-gray-100 p-8 shadow-2xl z-10 fixed top-16 left-0 h-full">
            <ul className="space-y-6">
                <li>
                    <Link href="/admin/products"
                        className={`block p-4 text-lg font-bold uppercase tracking-wide rounded-md transition-all duration-300 ${pathname === "/admin/courses"
                            ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:shadow-teal-500/50"
                            : "bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 text-gray-300 hover:text-white hover:shadow-teal-500/50"
                            }`}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users"
                        className={`block p-4 text-lg font-bold uppercase tracking-wide rounded-md transition-all duration-300 ${pathname === "/admin/blogs"
                            ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:shadow-teal-500/50"
                            : "bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 text-gray-300 hover:text-white hover:shadow-teal-500/50"
                            }`}
                    >
                        Users
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders"
                        className={`block p-4 text-lg font-bold uppercase tracking-wide rounded-md transition-all duration-300 ${pathname === "/admin/profile"
                            ? "bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg hover:shadow-teal-500/50"
                            : "bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 text-gray-300 hover:text-white hover:shadow-teal-500/50"
                            }`}
                    >
                        Orders
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
