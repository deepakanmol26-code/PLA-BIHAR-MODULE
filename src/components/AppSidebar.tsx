"use client";

import { BookOpen, Home, Search, Bookmark, StickyNote, ChevronDown, MessageCircle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { usePathname } from "next/navigation";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { meetings, cycleNames } from "@/data/bookContent";

const topItems = [
  { title: "मुख्य पृष्ठ", url: "/", icon: Home },
  { title: "खोजें", url: "/search", icon: Search },
  { title: "बुकमार्क", url: "/bookmarks", icon: Bookmark },
  { title: "मेरे नोट्स", url: "/notes", icon: StickyNote },
  { title: "सहायता चैटबॉट", url: "#chatbot", icon: MessageCircle },
];

const cycles = [1, 2, 3, 4];

const cycleColorClass: Record<number, string> = {
  1: "text-primary",
  2: "text-accent",
  3: "text-blue-500",
  4: "text-purple-500",
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            नेविगेशन
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                परिचय
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/intro" className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-primary font-medium">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>मार्गदर्शिका परिचय</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {cycles.map((cycle) => {
              const cycleMeetings = meetings.filter(m => m.cycle === cycle);
              const isActive = cycleMeetings.some(m => pathname === `/meeting/${m.id}`);

              return (
                <SidebarGroup key={cycle}>
                  <Collapsible defaultOpen={isActive}>
                    <CollapsibleTrigger className="w-full">
                      <SidebarGroupLabel className={`text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center justify-between ${cycleColorClass[cycle]}`}>
                        {cycleNames[cycle]}
                        <ChevronDown className="h-3 w-3 transition-transform" />
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {cycleMeetings.map((m) => (
                            <SidebarMenuItem key={m.id}>
                              <SidebarMenuButton asChild>
                                <NavLink
                                  to={`/meeting/${m.id}`}
                                  className="hover:bg-sidebar-accent/50 text-sm"
                                  activeClassName="bg-sidebar-accent text-primary font-medium"
                                >
                                  <span className="mr-2">{m.icon}</span>
                                  <span className="truncate">बैठक {m.meetingNumber}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
              );
            })}
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
