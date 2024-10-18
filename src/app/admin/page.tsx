import Navbar from "@/components/navbar";
import Topbar from "@/components/topbar";

export default function AdminLayout({ children }) {
    return (
        <>
            <Navbar />
            <Topbar />
            {children}
        </>
    );
}