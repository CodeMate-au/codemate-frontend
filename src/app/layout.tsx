import "@/styles/globals.css";
import styles from "@/styles/style";

export const metadata = {
  title: "CodeMate",
  description: "CodeMate is an Modern Landing Page built with Next JS and Typescript",
};


import Provider from "./provider";
// import { Header, Footer } from "@src/app/components/layout";
export const dynamic = 'force-dynamic'

const RootLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>


        <Provider >
          <div className="bg-w-full overflow-hidden">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
