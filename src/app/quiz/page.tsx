import Image from "next/image";
import styles from "../page.module.css";

export default function QuizForm() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <ol>
                    <li>
                        this is quiz page <code>src/app/quiz/page.tsx</code>.
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>
            </main>
        </div>
    );
}
