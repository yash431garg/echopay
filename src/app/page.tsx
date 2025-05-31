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
      splashImageUrl: `${appUrl}/images/next.svg`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "EchoPay",
    openGraph: {
      title: "EchoPay",
      description: "Seamless • Secure • Swift",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Page() {
  return <HomeContainer />;
}
