import { Leftbar } from "@/components/leftbar";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <main className="sm:container mx-auto w-[85vw] h-auto">
        <div className="flex items-start gap-14 mt-20">
          <Leftbar />
          <div className="flex-[4]">{children}</div>{" "}
        </div>
      </main>
    </ThemeProvider>
  );
}
