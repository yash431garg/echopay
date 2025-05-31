import Image from "next/image";
import HomeComponent from "@/app/components/Home";
import { useMiniAppContext } from "./hooks/useMiniAppContext";
import { SafeAreaContainer } from "./components/safe-area-container";
import dynamic from "next/dynamic";
import HomeContainer from "@/app/components/Home";
import { Metadata } from "next";



const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Launch Template",
    action: {
      type: "launch_frame",
      name: "Monad Farcaster MiniApp Template",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/next.svg`, // App icon in the splash screen (200px * 200px)
      splashBackgroundColor: "#f7f7f7", // Splash screen background color
    },
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Monad Farcaster MiniApp Template",
    openGraph: {
      title: "Monad Farcaster MiniApp Template",
      description: "A template for building mini-apps on Farcaster and Monad",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}


export default function Home() {
  const { context } = useMiniAppContext();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <HomeContainer />
      </SafeAreaContainer>
    </div>
  );
}
