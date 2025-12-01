import WelcomeSection from "@/components/invitation/WelcomeSection";
import CountdownSection from "@/components/invitation/CountdownSection";
import StorytellingSection from "@/components/invitation/StorytellingSection";
import VenueSection from "@/components/invitation/VenueSection";
import TimelineSection from "@/components/invitation/TimelineSection";
import DressCodeSection from "@/components/invitation/DressCodeSection";
import GallerySection from "@/components/invitation/GallerySection";
import RsvpSection from "@/components/invitation/RsvpSection";
import ClosingSection from "@/components/invitation/ClosingSection";

const Invitation = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <WelcomeSection />
      <CountdownSection />
      <StorytellingSection />
      <VenueSection />
      <TimelineSection />
      <DressCodeSection />
      <GallerySection />
      <RsvpSection />
      <ClosingSection />
    </div>
  );
};

export default Invitation;
