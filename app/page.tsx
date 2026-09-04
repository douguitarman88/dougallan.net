import Image from "next/image";
import styles from "./page.module.css";
import About from '@/components/pages/about';
import Recipes from '@/components/pages/recipes';
import Certs from '@/components/pages/certs';
import Experience from "@/components/pages/experience";
import Guitar from "@/components/pages/guitar";

export default function Home() {
  return (
    <>
    <About />
    <Recipes />
    <Certs />
    <Experience />
    <Guitar />
    </>
  );
}
