import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

const mockMessages = [
  {
    id: 1,
    sender: "John Doe",
    role: "Teacher",
    subject: "Math Homework Correction",
    excerpt: "Hello, I've reviewed your last assignment and...",
    time: "10:30 AM",
    read: false,
    avatar: "/teacher.png"
  },
  {
    id: 2,
    sender: "Jane Smith",
    role: "Admin",
    subject: "Holiday Announcement",
    excerpt: "Please note that the school will be closed on...",
    time: "Yesterday",
    read: true,
    avatar: "/admin.png"
  },
  {
    id: 3,
    sender: "Mike Ross",
    role: "Parent",
    subject: "Question about the field trip",
    excerpt: "Will the buses be equipped with seatbelts?",
    time: "2 days ago",
    read: true,
    avatar: "/parent.png"
  }
];

const MessagesPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return notFound();

    return (
        <div className="flex-1 p-4 flex flex-col lg:flex-row gap-4 h-full">
          {/* MESSAGES LIST (INBOX) */}
          <div className="w-full lg:w-1/3 bg-white rounded-md p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h1 className="text-xl font-semibold">Inbox</h1>
              <span className="bg-lamaSky text-white px-2 py-1 rounded-md text-xs">
                {mockMessages.filter(m => !m.read).length} New
              </span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {mockMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-4 rounded-md cursor-pointer transition-colors ${msg.read ? 'hover:bg-gray-50' : 'bg-lamaSkyLight'}`}
                >
                  <div className="flex items-center gap-3">
                    <Image src={msg.avatar} alt="" width={40} height={40} className="w-10 h-10 rounded-full bg-gray-100 p-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold">{msg.sender}</h2>
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-xs font-medium text-lamaSky">{msg.subject}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{msg.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHAT VIEW (PREVIEW) */}
          <div className="flex-1 bg-white rounded-md flex flex-col shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src="/teacher.png" alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
                <div>
                  <h1 className="text-sm font-semibold">John Doe</h1>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="/phone.png" alt="" width={20} height={20} className="cursor-pointer" />
                <Image src="/video.png" alt="" width={20} height={20} className="cursor-pointer" />
                <Image src="/more.png" alt="" width={20} height={20} className="cursor-pointer" />
              </div>
            </div>
            {/* CHAT CONTENT MOCKUP */}
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-gray-50">
                <div className="self-start bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[70%]">
                    <p className="text-sm">Hello! I just wanted to follow up on the Math homework.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">10:30 AM</span>
                </div>
                <div className="self-end bg-lamaSky text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-[70%]">
                    <p className="text-sm">Oh, hi teacher. Yes, I'm working on it right now!</p>
                    <span className="text-[10px] text-lamaSkyLight mt-1 block">10:32 AM</span>
                </div>
            </div>
            {/* CHAT INPUT */}
            <div className="p-4 border-t flex items-center gap-4">
              <Image src="/attachment.png" alt="" width={20} height={20} className="cursor-pointer" />
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-gray-100 p-2 rounded-md outline-none text-sm"
              />
              <button className="bg-lamaSky text-white px-4 py-2 rounded-md text-sm">Send</button>
            </div>
          </div>
        </div>
    );
};

export default MessagesPage;
