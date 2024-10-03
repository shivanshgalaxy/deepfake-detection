import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
                        <Link to="/" className="text-white">OmGuard</Link>
                    </div>

                    {/* Navigation Menu */}
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-6">
                            <NavigationMenuItem>
                                <Link to="/" className="text-white hover:text-zinc-400">
                                    <NavigationMenuLink className="text-zinc-400">Dashboard</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/analytics" className="text-white hover:text-zinc-400">
                                    <NavigationMenuLink className="text-zinc-400">Analytics</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/users" className="text-white hover:text-zinc-400">
                                    <NavigationMenuLink className="text-zinc-400">Profile</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link to="/notifications" className="text-white hover:text-zinc-400">
                                    <NavigationMenuLink className="text-zinc-400">Notifications</NavigationMenuLink>
                                </Link>
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
