import styles from "@/styles/style";
import { Hero } from "@src/app/components/ui/landing"
import { Header, Footer } from "@src/app/components/layout";
export default function Page() {
  return (
    <>
      <div className="bg-w-full overflow-hidden">
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}