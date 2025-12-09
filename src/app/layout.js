// import "./globals.css";

// export const metadata = {
//   title: "TeamFinance",
//   description: "Your financial dashboard and workspace",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">{children}</body>
//     </html>
//   );
// }
//src/app/layout.js
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

export const metadata = {
  title: "TeamFinance",
  description: "Your financial dashboard and workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionWrapper>{children}</SessionWrapper>
         {/* Soft Footer */}
        <footer className="text-center py-6 text-sm text-muted-foreground mb-2">
          Made with 💛 by Prachi
        </footer>
      </body>
    </html>
  );
}

