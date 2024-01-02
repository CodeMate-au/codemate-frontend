import styles from "@/styles/style";
import { logo } from "@/public/assets";
import { footerLinks, socialMedia } from "@/constants";
import Image from "next/image";
export default function Footer() {
  return (
    <section >
     
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className={styles.paragraph}>
          @2023 Code Mates by Thomas and Vittoria.
        </p>
        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <Image
              src={social.icon}
              key={social.id}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

