import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      Header
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className=" border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
        <div className="container text-center mx-auto pt-3 text-gray-500 px-4">
          <p>Made with ❤️ By SalmanulFaris</p>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
