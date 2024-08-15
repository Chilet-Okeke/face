import Head from "next/head";
import Login from "./_components";
export default async function Root() {
  return (
    <div className="relative">
      <Login />
    </div>
  );
}
