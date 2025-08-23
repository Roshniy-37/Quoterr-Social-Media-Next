import Header from "@/components/Header";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main className="h-screen w-full justify-center items-center flex">
      <section className="w-full h-full flex flex-col z-0 ">
        <Header/>
        <Posts/>
      </section>
    </main>
  );
}
