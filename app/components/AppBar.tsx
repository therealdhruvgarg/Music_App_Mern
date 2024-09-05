"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music } from "lucide-react"
import Link from "next/link"

export function AppBar() {
  const session = useSession();
  return (
    <div className="flex justify-between px-20 pt-3">
      <div className="text-lg font-bold flex flex-col justify-center text-white">Yohoho Music</div>
      
        <div >
          {session.data?.user && (
              <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"  onClick={() => signOut()}>
                SignOut
              </Button>
            )}
            {!session.data?.user && (
              <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"  onClick={() => signIn()}>
                SignIn
              </Button>)}
        </div>
   
      
    </div>
  );
}
