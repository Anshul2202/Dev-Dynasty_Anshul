import Navbar from './Navbar';
import Disclaimer from './Disclaimer';

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>{children}</main>
      <Disclaimer />
    </div>
  );
}

export default AppLayout;
