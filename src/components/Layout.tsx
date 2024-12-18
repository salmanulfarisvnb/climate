import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="container min-h-screen px-4 py-8 mx-auto">
        {children}
      </main>
      <footer className=" border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 pt-3 mx-auto text-center text-gray-500">
          <p>Made with ❤️ By SalmanulFaris</p>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
