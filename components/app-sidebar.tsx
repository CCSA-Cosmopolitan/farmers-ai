"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { BarChart3, Home, Leaf, LogOut, MessageSquare, Settings, Users, Wallet } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"

  const userRoutes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Farmers Assistant",
      href: "/farmers-assistant",
      icon: MessageSquare,
    },
    {
      title: "Farm Analyzer",
      href: "/farm-analyzer",
      icon: BarChart3,
    },
    {
      title: "Crop Analyzer",
      href: "/crop-analyzer",
      icon: Leaf,
    },
    {
      title: "Soil Analyzer",
      href: "/soil-analyzer",
      icon: BarChart3,
    },
    {
      title: "Wallet",
      href: "/wallet",
      icon: Wallet,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const adminRoutes = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const routes = isAdmin ? adminRoutes : userRoutes

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold">CCSA FarmAI</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{isAdmin ? "Admin" : "Dashboard"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={pathname === route.href}>
                    <Link href={route.href}>
                      <route.icon className="h-4 w-4" />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}


// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { useSession, signOut } from "next-auth/react"
// import { BarChart3, Home, Leaf, LogOut, MessageSquare, Settings, Users, Wallet } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/components/ui/sidebar"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { data: session } = useSession()
//   const isAdmin = session?.user?.role === "ADMIN"

//   const userRoutes = [
//     {
//       title: "Dashboard",
//       href: "/dashboard",
//       icon: Home,
//     },
//     {
//       title: "Farmers Assistant",
//       href: "/farmers-assistant",
//       icon: MessageSquare,
//     },
//     {
//       title: "Farm Analyzer",
//       href: "/farm-analyzer",
//       icon: BarChart3,
//     },
//     {
//       title: "Crop Analyzer",
//       href: "/crop-analyzer",
//       icon: Leaf,
//     },
//     {
//       title: "Soil Analyzer",
//       href: "/soil-analyzer",
//       icon: BarChart3,
//     },
//     {
//       title: "Wallet",
//       href: "/wallet",
//       icon: Wallet,
//     },
//     {
//       title: "Settings",
//       href: "/settings",
//       icon: Settings,
//     },
//   ]

//   const adminRoutes = [
//     {
//       title: "Dashboard",
//       href: "/admin/dashboard",
//       icon: Home,
//     },
//     {
//       title: "Users",
//       href: "/admin/users",
//       icon: Users,
//     },
//     {
//       title: "Settings",
//       href: "/admin/settings",
//       icon: Settings,
//     },
//   ]

//   const routes = isAdmin ? adminRoutes : userRoutes

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <div className="flex items-center gap-2 px-4 py-2">
//           <div className="rounded-full bg-primary/10 p-1">
//             <Leaf className="h-5 w-5 text-primary" />
//           </div>
//           <span className="text-xl font-bold">CCSA FarmAI</span>
//         </div>
//       </SidebarHeader>
//       <SidebarSeparator />
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>{isAdmin ? "Admin" : "Dashboard"}</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {routes.map((route) => (
//                 <SidebarMenuItem key={route.href}>
//                   <SidebarMenuButton asChild isActive={pathname === route.href}>
//                     <Link href={route.href}>
//                       <route.icon className="h-4 w-4" />
//                       <span>{route.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={session?.user?.image || ""} />
//               <AvatarFallback className="bg-primary/10 text-primary">
//                 {session?.user?.name?.charAt(0) || "U"}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="text-sm font-medium">{session?.user?.name}</p>
//               <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
//             </div>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => signOut({ callbackUrl: "/" })}
//             className="text-muted-foreground hover:text-foreground"
//           >
//             <LogOut className="h-4 w-4" />
//             <span className="sr-only">Log out</span>
//           </Button>
//         </div>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }



// // "use client"

// // import { usePathname } from "next/navigation"
// // import Link from "next/link"
// // import { useSession } from "next-auth/react"
// // import { logout } from "@/lib/auth-actions"
// // import { BarChart3, Home, Leaf, LogOut, MessageSquare, Settings, Users, Wallet } from "lucide-react"
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarGroup,
// //   SidebarGroupContent,
// //   SidebarGroupLabel,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// //   SidebarSeparator,
// // } from "@/components/ui/sidebar"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Button } from "@/components/ui/button"

// // export function AppSidebar() {
// //   const pathname = usePathname()
// //   const { data: session } = useSession()
// //   const isAdmin = session?.user?.role === "ADMIN"

// //   const userRoutes = [
// //     {
// //       title: "Dashboard",
// //       href: "/dashboard",
// //       icon: Home,
// //     },
// //     {
// //       title: "Farmers Assistant",
// //       href: "/farmers-assistant",
// //       icon: MessageSquare,
// //     },
// //     {
// //       title: "Farm Analyzer",
// //       href: "/farm-analyzer",
// //       icon: BarChart3,
// //     },
// //     {
// //       title: "Crop Analyzer",
// //       href: "/crop-analyzer",
// //       icon: Leaf,
// //     },
// //     {
// //       title: "Soil Analyzer",
// //       href: "/soil-analyzer",
// //       icon: BarChart3,
// //     },
// //     {
// //       title: "Wallet",
// //       href: "/wallet",
// //       icon: Wallet,
// //     },
// //     {
// //       title: "Settings",
// //       href: "/settings",
// //       icon: Settings,
// //     },
// //   ]

// //   const adminRoutes = [
// //     {
// //       title: "Dashboard",
// //       href: "/admin/dashboard",
// //       icon: Home,
// //     },
// //     {
// //       title: "Users",
// //       href: "/admin/users",
// //       icon: Users,
// //     },
// //     {
// //       title: "Settings",
// //       href: "/admin/settings",
// //       icon: Settings,
// //     },
// //   ]

// //   const routes = isAdmin ? adminRoutes : userRoutes

// //   return (
// //     <Sidebar>
// //       <SidebarHeader>
// //         <div className="flex items-center gap-2 px-4 py-2">
// //           <Leaf className="h-6 w-6 text-primary" />
// //           <span className="text-xl font-bold">CCSA FarmAI</span>
// //         </div>
// //       </SidebarHeader>
// //       <SidebarSeparator />
// //       <SidebarContent>
// //         <SidebarGroup>
// //           <SidebarGroupLabel>{isAdmin ? "Admin" : "Dashboard"}</SidebarGroupLabel>
// //           <SidebarGroupContent>
// //             <SidebarMenu>
// //               {routes.map((route) => (
// //                 <SidebarMenuItem key={route.href}>
// //                   <SidebarMenuButton asChild isActive={pathname === route.href}>
// //                     <Link href={route.href}>
// //                       <route.icon className="h-4 w-4" />
// //                       <span>{route.title}</span>
// //                     </Link>
// //                   </SidebarMenuButton>
// //                 </SidebarMenuItem>
// //               ))}
// //             </SidebarMenu>
// //           </SidebarGroupContent>
// //         </SidebarGroup>
// //       </SidebarContent>
// //       <SidebarFooter>
// //         <div className="flex items-center justify-between p-4">
// //           <div className="flex items-center gap-3">
// //             <Avatar>
// //               <AvatarImage src={session?.user?.image || ""} />
// //               <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
// //             </Avatar>
// //             <div>
// //               <p className="text-sm font-medium">{session?.user?.name}</p>
// //               <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
// //             </div>
// //           </div>
// //           <form
// //             action={async () => {
// //               await logout()
// //             }}
// //           >
// //             <Button variant="ghost" size="icon" type="submit">
// //               <LogOut className="h-4 w-4" />
// //               <span className="sr-only">Log out</span>
// //             </Button>
// //           </form>
// //         </div>
// //       </SidebarFooter>
// //     </Sidebar>
// //   )
// // }

