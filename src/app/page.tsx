import styles from "./page.module.css";
import { Metadata } from "next";
import Editor from "@/components/editor";

export default function LinkedInFormatterPage() {
  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["sr-only"]}>
        AlphaFormat - Professional LinkedIn Post Formatter and Text Editor
      </h1>
      <div className={styles["app-container"]}>
        {/* Static Header (Server Rendered) */}
        <header className={styles["app-header"]}>
          <h1>AlphaFormat</h1>
          <p>Elevate your personal branding with formatted posts</p>
        </header>

        {/* Dynamic Client Component */}
        <Editor />

        {/* Static Footer (Server Rendered) */}
        <footer className={styles["dev-footer"]}>
          Built for Modern Professionals
        </footer>
      </div>
    </div>
  );
}
