import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";

const SettingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return notFound();

  const { user } = session;

  return (
    <div className="p-4 flex flex-col gap-8 flex-1">
      <h1 className="text-xl font-semibold">Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ACCOUNT SETTINGS */}
        <div className="bg-white p-6 rounded-md flex-1 shadow-sm">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Image src="/profile.png" alt="" width={20} height={20} />
            Account Information
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Username</span>
              <span className="text-sm font-medium">{user.name || user.email.split('@')[0]}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Email Address</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">User Role</span>
              <span className="text-sm font-medium px-2 py-1 bg-lamaSkyLight rounded-md w-max">
                {user.role?.toUpperCase()}
              </span>
            </div>
          </div>
          <button className="mt-8 bg-lamaSky text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Update Profile
          </button>
        </div>

        {/* SECURITY & PREFERENCES */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Image src="/setting.png" alt="" width={20} height={20} />
              Security
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Change Password</span>
                  <span className="text-xs text-gray-400">Update your account password</span>
                </div>
                <button className="text-blue-500 text-sm font-medium hover:underline">Edit</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <span className="text-xs text-gray-400">Add an extra layer of security</span>
                </div>
                <div className="w-10 h-5 bg-gray-300 rounded-full cursor-pointer relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Image src="/announcement.png" alt="" width={20} height={20} />
              Notifications
            </h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-lamaSky" />
                <span className="text-sm">Email notifications for new assignments</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-lamaSky" />
                <span className="text-sm">Push notifications for exam results</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-lamaSky" />
                <span className="text-sm">Weekly progress reports</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
