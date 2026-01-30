import FAQCard from '../../components/Landing/FAQ/FAQCard';
import Hero from '../../components/Landing/Home/Hero';
import ItsWork from '../../components/Landing/Home/ItsWork';
import Review from '../../components/Landing/Home/Review';
import WhyChooseMynder from '../../components/Landing/Home/WhyChoseMynder';

export default function page() {
  return (
    <div>
      <div>
        <Hero />
        <ItsWork />
        <WhyChooseMynder />
        <Review />
        <FAQCard />
      </div>
    </div>
  )
}