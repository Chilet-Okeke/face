import Head from "next/head";
import HomeIndex from "./_component";
export default async function Root() {
  return (
    <div className="relative">
      <HomeIndex />
    </div>
  );
}
