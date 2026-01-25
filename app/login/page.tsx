"use client"

import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white px-6 pt-24 pb-16 text-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Client Login</h1>
        <p className="mt-4 text-neutral-600">
          This page is intentionally minimal for now.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

