import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import CartIcon from "@/images/icons/sepet.png";
import DefaultUserIcon from "@/images/icons/user.png";
import Logo from "@/images/logo-large.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [userIcon, setUserIcon] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchUserIcon = async () => {
    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.profileImage) {
          setUserIcon(userData.profileImage);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserIcon();
  }, [user]);

  const handleIconClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white text-stone-900 flex justify-between items-center p-4 border-b-[1px] border-stone-200 relative">
      <div className="flex items-center pl-10">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </div>
      <div className="flex space-x-4">
        <button className="hover:underline">Home</button>
        <button className="hover:underline">Tours</button>
      </div>
      <div className="flex items-center space-x-4 pr-10">
        <Image src={CartIcon} alt="Cart" width={30} height={30} className="cursor-pointer" />

        <div className="relative">
          <Image src={userIcon || DefaultUserIcon} alt="User" width={30} height={30} className="cursor-pointer" onClick={handleIconClick} />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
              <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
