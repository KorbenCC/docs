import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer";

/**
 * The metadata for this app.
 */
export const metadata: Metadata = {
    title: {
        default: "Pulse Docs",
        template: "%s • Pulse Docs",
    },
    description:
        "A lightweight service monitoring solution for tracking the availability of whatever service your heart desires!",
    openGraph: {
        images: [
            {
                url: "https://pulseapp.cc/media/logo.png",
                width: 128,
                height: 128,
            },
        ],
    },
    twitter: {
        card: "summary",
    },
};
export const viewport: Viewport = {
    themeColor: "#A855F7",
};

/**
 * The primary layout for this app.
 */
const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement => (
    <html lang="en">
        <body
            className="scroll-smooth antialiased"
            style={{
                background: "var(--background-gradient)",
            }}
        >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <div className="px-7 max-w-[90rem] mx-auto min-h-screen flex flex-col">
                    <Navbar />
                    <div className="pt-[4.5rem] w-full h-full flex flex-grow gap-5">
                        <div className="relative hidden xs:flex">
                            <Sidebar />
                        </div>
                        {children}
                    </div>
                </div>
                <Footer />
            </ThemeProvider>
        </body>
    </html>
);
export default RootLayout;
