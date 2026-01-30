import TimelineSection from "@/components/Landing/HowItWorks/TimelineSection";
import VideoSection from "@/components/Landing/HowItWorks/VideoSection";
import FAQCard from '../../../components/Landing/FAQ/FAQCard';

export default function page() {
  return (
    <main>
      <VideoSection />
      <TimelineSection />
      <FAQCard />
    </main>
  )
}