"use client";

import Sidebar from "../components/AdminSidebar";
import "./../../app/globals.css";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-grow ml-64 p-20">
                {children}
            </main>
        </div>
    );
}