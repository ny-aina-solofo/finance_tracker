import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
    return (
        <header className="bg-white flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        Building Your Application
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb> */}
            </div>
        </header>
    )
}
