interface ViewCollectionButtonProps {
  href: string
}

export function ViewCollectionButton({ href }: ViewCollectionButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#1b3260] px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] text-white shadow-xl transition-[background-color,transform] hover:scale-105 hover:bg-[#24427c] active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
    >
      view collection
    </a>
  )
}
