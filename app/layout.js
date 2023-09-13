import AuthProvider from "@/components/Providers/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/context/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calendario de Vacunacion AR",
  description: "Calendario Nacional de Vacunación",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider>
            <Navbar />
            <div id="modal-root"></div>
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
