import type React from "react"
import { getServerSession } from "@/auth"
import { redirect } from "next/navigation"
import { ProtectedLayoutWrapper } from "@/components/protected-layout-wrapper"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/")}`)
  }

  // If email not verified, redirect to login
  if (!session.user.emailVerified) {
    return redirect("/login")
  }

  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>
}



// import type React from "react"
// import { getServerSession } from "@/auth"
// import { redirect } from "next/navigation"
// import { SessionProvider } from "next-auth/react"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession()

//   if (!session || !session.user) {
//     redirect(`/login?callbackUrl=${encodeURIComponent("/")}`)
//   }

//   // If email not verified, redirect to login
//   if (!session.user.emailVerified) {
//     return redirect("/login")
//   }

//   return (
//     <SessionProvider session={session}>
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <AppSidebar />
//         <main className="flex-1 overflow-y-auto">{children}</main>
//       </div>
//     </SidebarProvider>
//     </SessionProvider>
//   )
// }



// import type React from "react"
// import { auth } from "@/auth"
// import { redirect } from "next/navigation"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await auth()

//   if (!session || !session.user) {
//     redirect(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
//   }

//   // If email not verified, redirect to login
//   if (!session.user.emailVerified) {
//     return redirect("/login")
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <AppSidebar />
//         <main className="flex-1 overflow-y-auto">{children}</main>
//       </div>
//     </SidebarProvider>
//   )
// }

