import Link from "next/link"

export default function ModalButton() {

  return (
    <div className="flex items-center justify-center">
      <Link
        href="/dashboard/createroom"

        className="rounded-md bg-black px-6 py-4 text-sm font-medium text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Create Room
      </Link>
    </div>
  )
}