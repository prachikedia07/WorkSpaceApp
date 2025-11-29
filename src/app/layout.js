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
      </body>
    </html>
  );
}

