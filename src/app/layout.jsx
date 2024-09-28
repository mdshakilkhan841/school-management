import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Lama Dev School Management Dashboard",
    description: "Next.js School Management System",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    {children}{" "}
                    <ToastContainer position="bottom-right" theme="dark" />
                </body>
            </html>
        </ClerkProvider>
    );
}
