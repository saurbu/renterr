import React from "react";
import { ShieldCheck, Mail, Phone, CreditCard, UserRound, Pencil } from "lucide-react";

const Profile = () => {
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

    const profileImg = storedUser?.profileImage?.data
    ? `data:${storedUser.profileImage.contentType};base64,${storedUser.profileImage.data}`
    : "https://via.placeholder.com/40"

    const idProofImage = storedUser?.idProofImage?.data
    ? `data:${storedUser.idProofImage.contentType};base64,${storedUser.idProofImage.data}`
    : "https://via.placeholder.com/40"

  return (
    <div className="w-full  p-4 mb-5">
      <div className="bg-white rounded-2xl  p-5 mb-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={profileImg}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-indigo-950">
              {storedUser?.name || "User"}
            </h1>
            <p className="text-gray-500 mt-1">
              {storedUser?.email || "No email available"}
            </p>
              <div className="flex justify-center sm:justify-start items-center gap-1 mt-2 text-green-600 font-semibold text-sm">
                <ShieldCheck size={18} />
                Verified Profile
              </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.3)] p-5 mb-5">
        <h2 className="text-xl font-bold text-indigo-950 mb-5">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <UserRound className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-semibold">{storedUser?.name || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <Mail className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold break-all">{storedUser?.email || "Not provided"}</p>
            </div>
        </div>


          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <Phone className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">Mobile Number</p>
              <p className="font-semibold">{storedUser?.mobile || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <CreditCard className="text-indigo-600" />
            <div>
              <p className="text-xs text-gray-500">{storedUser?.idType || "Not provided"}</p>
              <p className="font-semibold uppercase">{storedUser?.idNumber || "Not provided"}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl p-5">

        <h2 className="text-xl font-bold text-indigo-950 mb-4">
          Identity Proof
        </h2>

        <div className="flex flex-col md:flex-row gap-5">

          <div className="w-full md:w-72 h-44 rounded-xl overflow-hidden border bg-gray-100">
            {storedUser?.idProofImage ? (
              <img
                src={idProofImage}
                alt={storedUser.idType}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                ID photo not available
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">
              {storedUser.idType}
            </p>

            <p className="text-lg font-bold text-indigo-950 uppercase">
              {storedUser?.idNumber || "Not provided"}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              Your document is securely stored and used only
              for verification purposes.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
