import { SocialLinks } from '@/components/ui/social-links'
import { ViewCollectionButton } from '@/components/ui/view-collection-button'
import { SectionThreeText } from './section-three-text'
import { StreamingAnimals } from './streaming-animals'

export function SectionThree() {
  return (
    <section className="section-three invisible absolute inset-0 z-[17] overflow-hidden opacity-0">
      <StreamingAnimals />
      <SectionThreeText />

      <div className="absolute bottom-5 left-4 pointer-events-auto sm:bottom-8 sm:left-8">
        <SocialLinks />
      </div>
      <div className="absolute right-4 bottom-4 pointer-events-auto sm:right-8 sm:bottom-8">
        <ViewCollectionButton href="#" />
      </div>
    </section>
  )
}
