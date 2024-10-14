"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Footer from "@/components/Footer";

import UserIcon from "@/images/icons/user.png";
import Countries from "@/country.json";
import Navbar from "@/components/Navbar";

interface Country {
  name: string;
  prefix: string;
}

interface User {
  profileImage: string;
  firstName?: string; // Optional now
  lastName?: string; // Optional now
  country?: string; // Optional now
  dateOfBirth?: string; // Optional now
  passportNumber?: string;
  phone?: string;
}

export default function Home() {
  const { user, loading, setLoading } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [activeButton, setActiveButton] = useState("Personal");
  const [editedUserInfo, setEditedUserInfo] = useState<User | null>(null);
  const [countries, setCountries] = useState<Country[]>(Countries);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);
        if (userData.exists()) {
          setUserInfo(userData.data() as User);
          setEditedUserInfo(userData.data() as User);
        } else {
          console.error("No user data found");
        }
      };

      fetchUserInfo();
    } else {
      router.replace("/login");
    }
  }, [user]);

  const handleButtonClick = (buttonLabel: string) => {
    setActiveButton(buttonLabel);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && user) {
      setLoading(true);

      const storageRef = ref(storage, `profileImages/${user.uid}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        const userDoc = doc(db, "users", user.uid);
        const updatedUserInfo = { ...editedUserInfo, profileImage: url };
        await updateDoc(userDoc, updatedUserInfo);

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo!,
          profileImage: url,
        }));
        setEditedUserInfo((prevEditedInfo) => ({
          ...prevEditedInfo!,
          profileImage: url,
        }));

        setFile(null);
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const convertToFirestoreFormat = (userData: User): { [key: string]: any } => {
    return {
      profileImage: userData.profileImage,
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: userData.country,
      dateOfBirth: userData.dateOfBirth,
      passportNumber: userData.passportNumber || "",
      phone: userData.phone || "",
    };
  };

  const handleSaveChanges = async () => {
    console.log(editedUserInfo);
    if (user && editedUserInfo) {
      if (editedUserInfo.firstName === "" || editedUserInfo.lastName === "") {
        return alert("Bilgilerinizi boş bırakamazsınız!");
      }
      const userDoc = doc(db, "users", user.uid);
      const formattedUserInfo = convertToFirestoreFormat(editedUserInfo);
      await updateDoc(userDoc, formattedUserInfo);
      setUserInfo(editedUserInfo);
      setActiveButton("Personal");
    }
  };

  return (
    <div className="max-h-screen">
      <Navbar />
      <main className="flex">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
          </div>
        )}
        <div className="w-1/3 px-[7rem] pt-10">
          <div className="flex flex-col items-center border-2 pt-4 rounded-xl">
            {userInfo && (
              <div className="mb-4 text-center">
                <Image src={userInfo.profileImage || UserIcon} alt="User Logo" width={100} height={100} className="rounded-full mb-2" />
                <p className="font-bold">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-gray-500">Super Host</p>
              </div>
            )}
            <div className="w-full flex flex-col items-center">
              <div className="flex space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold">4.80</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">100</p>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">4</p>
                  <p className="text-sm text-gray-600">Years Hosting</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 w-full px-20 mt-5 border-2 py-3 rounded-xl">
            {["Personal", "Bookings", "Reviews", "Settings", "Notifications"].map((label) => (
              <button key={label} className={`w-full px-4 py-2 font-semibold text-left ${activeButton === label ? "bg-[#fdab1e] text-white" : "hover:bg-gray-200"} rounded-xl`} onClick={() => handleButtonClick(label)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-2/3 h-[42rem]">
          {activeButton === "Personal" && userInfo && (
            <div className="">
              <div className="p-4 mb-4 flex flex-col py-12">
                <h2 className="text-2xl mb-2 font-bold pb-5">Information</h2>
                <div className="flex items-center">
                  <p>
                    <strong>Name:</strong> {userInfo.firstName || "N/A"}
                  </p>
                  <p className="ml-32">
                    <strong>Surname:</strong> {userInfo.lastName || "N/A"}
                  </p>
                </div>
                <p>
                  <strong>Country:</strong> {userInfo.country || "N/A"}
                </p>
                <p>
                  <strong>Birthday:</strong> {userInfo.dateOfBirth || "N/A"}
                </p>
                <p>
                  <strong>Passport Number:</strong> {userInfo.passportNumber || "N/A"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userInfo.phone || "N/A"}
                </p>
              </div>
              <div className="p-4 mb-4 flex flex-col">
                <h2 className="text-2xl mb-2 font-bold pb-5">Passengers</h2>
                <div className="flex items-center">
                  <p>
                    <strong>Name:</strong> N/A
                  </p>
                  <p className="ml-32">
                    <strong>Surname:</strong> N/A
                  </p>
                </div>
                <p>
                  <strong>Country:</strong> N/A
                </p>
                <p>
                  <strong>Birthday:</strong> N/A
                </p>
                <p>
                  <strong>Passport Number:</strong> N/A
                </p>
                <p>
                  <strong>Phone Number:</strong> N/A
                </p>
              </div>
            </div>
          )}
          {activeButton === "Settings" && (
            <div className="p-4 mb-4 flex flex-col py-12">
              <h2 className="text-2xl mb-2 font-bold">Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">First Name</label>
                  <input type="text" value={editedUserInfo?.firstName} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, firstName: e.target.value })} className="border rounded p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input type="text" value={editedUserInfo?.lastName} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, lastName: e.target.value })} className="border rounded p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Country</label>
                  <select value={editedUserInfo?.country} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, country: e.target.value })} className="border rounded p-2 w-full">
                    {countries.map((country) => (
                      <option key={country.prefix} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Date of Birth</label>
                  <input type="date" value={editedUserInfo?.dateOfBirth} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, dateOfBirth: e.target.value })} className="border rounded p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Passport Number</label>
                  <input type="text" value={editedUserInfo?.passportNumber} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, passportNumber: e.target.value })} className="border rounded p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Phone Number</label>
                  <input type="text" value={editedUserInfo?.phone} onChange={(e) => setEditedUserInfo({ ...editedUserInfo!, phone: e.target.value })} className="border rounded p-2 w-full" />
                </div>
                <div>
                  <label className="block mb-1">Profile Image</label>
                  <input type="file" onChange={handleFileChange} className="border rounded p-2 w-full" />
                  {file && (
                    <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
                      Upload
                    </button>
                  )}
                </div>
              </div>
              <button onClick={handleSaveChanges} className="mt-4 bg-green-500 text-white rounded px-4 py-2">
                Save Changes
              </button>
            </div>
          )}
          {activeButton === "Bookings" && (
            <div className="p-4 mb-4 py-12">
              <h2 className="text-2xl mb-2 font-bold">Bookings</h2>
            </div>
          )}
          {activeButton === "Reviews" && (
            <div className="p-4 mb-4 py-12">
              <h2 className="text-2xl mb-2 font-bold">Reviews</h2>
            </div>
          )}
          {activeButton === "Notifications" && (
            <div className="p-4 mb-4 py-12">
              <h2 className="text-2xl mb-2 font-bold">Notifications</h2>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
