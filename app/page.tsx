"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
//@ts-ignore
import { Users, Radio, Headphones } from "lucide-react"

import useRedirect from "./hooks/useRedirect"

import { Appbar } from "./components/Appbar";




export default function LandingPage() {
  useRedirect();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
<Appbar/>
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Let Your Fans Choose Your Streams Soundtrack
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Yohoho Music revolutionizes music streaming by putting the power in your fans hands.
          </p>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors" size="lg">
            Get Started
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow">
            <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-bold mb-2 text-purple-400">Engage Fans</h3>
            <p className="text-gray-300">Boost interaction and keep your audience coming back.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow">
            <Radio className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-bold mb-2 text-purple-400">Unique Streams</h3>
            <p className="text-gray-300">Every stream becomes a one-of-a-kind experience.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow">
            <Headphones className="h-12 w-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2 text-purple-400">Discover Music</h3>
            <p className="text-gray-300">Expand your musical horizons with fan curation.</p>
          </div>
        </div>
        <div className="mt-20 max-w-md mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">Sign Up for Early Access</h2>
            <p className="text-gray-300 mb-6 text-center">Be among the first to revolutionize your streams with Yohoho Music.</p>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors" type="submit">
                Join the Waitlist
              </Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="mt-auto py-6 px-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm mb-4 sm:mb-0 text-gray-400">© 2023 Yohoho Music. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-sm text-gray-400 hover:text-purple-400 transition-colors" href="#">
              Terms
            </Link>
            <Link className="text-sm text-gray-400 hover:text-purple-400 transition-colors" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
