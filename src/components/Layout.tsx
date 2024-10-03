import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            {/* Navigation Menu using zinc background */}
            <nav className="bg-zinc-900 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Brand */}
                    <div className="text-2xl font-bold">
                        <NavLink to="/" className="text-white">OmGuard</NavLink>
                    </div>

                    {/* Navigation Menu */}
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-6">
                            <NavigationMenuItem>
                                <NavLink to="/">
                                    {({ isActive }) => (
                                        <NavigationMenuLink
                                            className={`${isActive ? "text-white" : "text-zinc-400"} hover:text-white`}
                                        >
                                            Dashboard
                                        </NavigationMenuLink>
                                    )}
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink to="/analytics">
                                    {({ isActive }) => (
                                        <NavigationMenuLink
                                            className={`${isActive ? "text-white" : "text-zinc-400"} hover:text-white`}
                                        >
                                            Analytics
                                        </NavigationMenuLink>
                                    )}
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink to="/users">
                                    {({ isActive }) => (
                                        <NavigationMenuLink
                                            className={`${isActive ? "text-white" : "text-zinc-400"} hover:text-white`}
                                        >
                                            Profile
                                        </NavigationMenuLink>
                                    )}
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink to="/notifications">
                                    {({ isActive }) => (
                                        <NavigationMenuLink
                                            className={`${isActive ? "text-white" : "text-zinc-400"} hover:text-white`}
                                        >
                                            Notifications
                                        </NavigationMenuLink>
                                    )}
                                </NavLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Add a button if needed */}
                    <Button variant="ghost" className="ml-4 hover:bg-zinc-700">
                        Login
                    </Button>
                </div>
            </nav>

            {/* Main content */}
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;