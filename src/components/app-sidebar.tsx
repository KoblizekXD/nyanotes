"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ExternalLink,
  Notebook,
  Settings,
  Sparkles,
  Star,
  StickyNote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex p-2 cursor-pointer select-none hover:bg-muted transition-colors rounded-md items-center">
              <Avatar>
                <AvatarImage src="https://github.com/KoblizekXD.png" />
                <AvatarFallback>BE</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-2 text-xs">
                <span className="font-semibold">Test user</span>
                <span className="text-[10px]">email@email.com</span>
              </div>
              <ChevronDown className="ml-auto" size={18} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"awdaw"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Test</span>
                  <span className="truncate text-xs">test@test.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Try our AI
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                My profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 font-semibold">
              <ExternalLink />
              Signout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent className="p-1">
        <SidebarGroup>
          <SidebarGroupLabel>Me</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton onClick={() => router.push("/home/posts")}>
              <StickyNote />
              Posts
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => router.push("/home/authors")}>
              <Notebook />
              Notes
            </SidebarMenuButton>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  onClick={() => router.push("/home/favorites")}
                >
                  <Star />
                  Favorites
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton onClick={() => router.push("/home/favorites#posts")}>Posts</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton onClick={() => router.push("/home/favorites#authors")}>Authors</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton onClick={() => router.push("/home/favorites#notes")}>Notes</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
