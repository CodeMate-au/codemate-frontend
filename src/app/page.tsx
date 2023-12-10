import styles from "@/styles/style";
import { Navbar, Hero, Footer } from "@src/app/ui/landing"
import Link from "next/link";

// type code = {
//   code: string;

// }

// async function getUserGHCode(): Promise<code> {
//   const res = await fetch(`${process.env.BACKEND_URL}/api/auth/github/login`)
//   const data = await res.json()
//   console.log(data)
//   return data
// }

export default function Page() {
  return (
    <>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}