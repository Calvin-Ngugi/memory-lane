import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Cloud, Lock, Share2 } from "lucide-react";
import { AlbumArtwork } from "./albumArtwork";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your memories, beautifully organized
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create stunning albums, store your precious moments, and share them with loved ones. All in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Cloud className="h-10 w-10" />
                <h2 className="text-xl font-bold">Cloud Storage</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Securely store your photos in the cloud, accessible from any device.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Lock className="h-10 w-10" />
                <h2 className="text-xl font-bold">Private Albums</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Create private albums for your eyes only or share them with select individuals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Share2 className="h-10 w-10" />
                <h2 className="text-xl font-bold">Easy Sharing</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Share your albums with friends and family with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Sample Albums
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AlbumArtwork
                album={{
                  name: "Summer Vacation",
                  artist: "John Doe",
                  cover: "https://res.cloudinary.com/zicasso/image/fetch/c_fill,f_auto,g_auto,h_576,q_auto,w_865/https://images.zicasso.com/dcfcc0122b6f64ae02fe5d0bee71987a.jpg",
                }}
                className="w-full"
                aspectRatio="square"
                width={400}
                height={400}
              />
              <AlbumArtwork
                album={{
                  name: "Family Reunion",
                  artist: "Jane Smith",
                  cover: "https://nationaltoday.com/wp-content/uploads/2021/06/National-Family-Reunion-Month.jpg",
                }}
                className="w-full"
                aspectRatio="square"
                width={400}
                height={400}
              />
              <AlbumArtwork
                album={{
                  name: "Wedding Day",
                  artist: "Mike Johnson",
                  cover: "https://cdn.shopify.com/s/files/1/0023/8243/0257/files/Wedding-Shoppe-Inc-2024-Wedding-Colors-Popular_1_1024x1024.jpg?v=1688264033",
                }}
                className="w-full"
                aspectRatio="square"
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Organizing Your Memories Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who trust us with their precious moments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Albumify Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
