import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'VoteSaathi | India\'s Election Portal',
  description: 'A professional guide to voting, candidates, and the democratic process in India. Powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a script to prevent flash of unstyled content on mount
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const store = localStorage.getItem('app-storage');
                if (store) {
                  const data = JSON.parse(store).state;
                  if (data.highContrast) {
                    document.documentElement.setAttribute('data-theme', 'high-contrast');
                  }
                  if (data.fontSize) {
                    document.documentElement.style.fontSize = data.fontSize + 'px';
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-blue-200 selection:text-blue-900" suppressHydrationWarning>
        {children}
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
        />
      </body>
    </html>
  );
}

