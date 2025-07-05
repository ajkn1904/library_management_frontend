
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MenuSquare } from "lucide-react";
import { Link } from "react-router";

const NavDropDown = () => {

    return (
        <div>
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem className="w-[90px]">
                        <NavigationMenuTrigger className="p-2">
                            <MenuSquare />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute top-full bg-white rounded-md shadow-md w-full p-2">
                            <ul className="grid gap-2">
                                <li>
                                    <NavigationMenuLink asChild className="hover:bg-blue-200">
                                        <Link to="/books" className="block px-2 py-1 rounded ">All Books</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild className="hover:bg-blue-200">
                                        <Link to="/create-book" className="block px-2 py-1 rounded ">Add Book</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild className="hover:bg-blue-200">
                                        <Link to="/borrow-summary" className="block px-2 py-1 rounded ">Borrow Summary</Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    );
};

export default NavDropDown;