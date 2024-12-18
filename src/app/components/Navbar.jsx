// import Link from 'next/link';
// import Cookies from 'js-cookie';

// const Navbar = () => {
//     const accessToken = Cookies.get('accessToken');

//     const handleLogout = () => {
//         Cookies.remove('accessToken');
//         router.push("/login");
//     };

//     return (
//         <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-teal-600 shadow-lg z-50 h-16">
//             <div className="max-w-7xl mx-auto px-4">
//                 <div className="flex justify-between items-center h-16">
//                     <div className="flex-shrink-0 text-white text-3xl font-extrabold">
//                         Admin Panel
//                     </div>


//                     <div className="hidden md:flex space-x-8">
//                         {accessToken && (
//                             <Link
//                                 href="#"
//                                 onClick={handleLogout}
//                                 className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
//                             >
//                                 Log out
//                             </Link>
//                         )}
//                     </div>

//                     <div className="md:hidden">
//                         <button className="text-white focus:outline-none">
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

"use client";

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [accessToken, setAccessToken] = useState(null); // Initialize as null to avoid hydration issues
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        Cookies.remove('accessToken');
        setAccessToken(null);
        router.push("/");
    };

    useEffect(() => {
        const token = Cookies.get('accessToken');
        setAccessToken(token); // Set the token after the component mounts
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-teal-600 shadow-lg z-50 h-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-white text-3xl font-extrabold">
                        Admin Panel
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {accessToken !== null && ( // Only render the logout link after checking the token
                            <Link
                                href="#"
                                onClick={handleLogout}
                                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
                            >
                                Log out
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

