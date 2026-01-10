import Card from "@/components/Card";
import { Heading1, User2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="bg-[#edf2f4ff] p-8 min-h-screen font-display">
      <div className="flex items-start gap-10 bg-white/90 p-6 rounded-2xl">
        <div className="">
          {user?.profilePicture ? (
            <img src={user?.profilePicture} alt="" />
          ) : (
            <span>{user.name}</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="flex gap-2 items-center mb-2">
            <User2 /> {user.name}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl my-10 bg-gradient-to-r from-[#d90429] to-[#ef233c] bg-clip-text text-transparent">
          My businesses{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {user?.businesses?.map((business) => (
            <Card key={business._id} {...business} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
