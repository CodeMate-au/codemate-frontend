import Link from "next/link"

export default function DeleteButton() {

  return (
    <div className="flex items-center justify-center">
      <Link
        href="/dashboard/edit"

        className="rounded-md bg-black px-6 py-4 text-sm font-medium text-white hover:bg-orange-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Delete
      </Link>
    </div>
  )
}