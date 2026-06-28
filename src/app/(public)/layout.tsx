import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageEnhancements from "@/components/layout/PageEnhancements";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageEnhancements />
      <main className="flex-1 page-fade-in">{children}</main>
      <Footer />
    </>
  );
}
