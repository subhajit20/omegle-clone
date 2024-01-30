// import HomePage from "@/components/pageComponents/HomePage"
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/components/pageComponents/HomePage"));

export default function Home() {
  return (
    <main className="min-h-screen h-screen">
      <HomePage />
    </main>
  );
}
