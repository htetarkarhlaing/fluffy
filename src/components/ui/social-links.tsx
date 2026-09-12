const SOCIAL_LINKS = [
  { name: 'Discord', href: '#', icon: '/logo/discord.svg' },
  { name: 'OpenSea', href: '#', icon: '/logo/opensea.svg' },
  { name: 'Twitter', href: '#', icon: '/logo/twitter.svg' },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          aria-label={link.name}
          className="size-9 transition-transform duration-200 ease-out hover:scale-90 active:scale-95 sm:size-10"
        >
          <img src={link.icon} alt="" className="size-full object-contain drop-shadow-sm" />
        </a>
      ))}
    </div>
  )
}
