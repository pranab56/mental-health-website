import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}