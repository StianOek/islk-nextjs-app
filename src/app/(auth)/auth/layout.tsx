// src/app/login/layout.tsx
import "../../../globals.css";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen w-full">
        <div className="w-full  bg-white rounded shadow">{children}</div>
      </body>
    </html>
  );
}
