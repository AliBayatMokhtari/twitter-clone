import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import { getProviders, getSession, useSession } from "next-auth/react";
import axios from "axios";
import https from "https";
import Login from "@/components/Login";
import Modal from "@/components/Modal";

export default function Home({ providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <main className="min-h-screen bg-black flex max-w-[1500px]">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}

      {/* Modal */}
      <Modal />
    </main>
  );
}

export async function getServerSideProps(context) {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const trendingResults = await axios.get("https://jsonkeeper.com/b/NKEV", {
    httpsAgent: agent,
  });

  const followResults = await axios.get("https://jsonkeeper.com/b/WWMJ", {
    httpsAgent: agent,
  });

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults: trendingResults.data,
      followResults: followResults.data,
      providers,
      session,
    },
  };
}
