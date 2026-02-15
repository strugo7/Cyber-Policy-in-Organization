import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CyberScape Academy - מדיניות סייבר בארגון',
  description: 'פלטפורמת לימוד אינטראקטיבית להכנה למבחן במדיניות סייבר בארגון',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen grid-bg">
        {children}
      </body>
    </html>
  );
}
