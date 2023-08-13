"use client";

import Desktop from "@/components/navbar/desktop";
import Mobile from "@/components/navbar/mobile";
import TopBar from "@/components/top-bar/top-bar";

export default function Home() {
  return (
    <main className="">
      <section className="flex">
        <Desktop />
        <Mobile />
        <section className="flex-1">
          <TopBar />
        </section>
      </section>

    </main>
  )
}
