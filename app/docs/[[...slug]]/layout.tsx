import { Footer } from "@/components/footer";
import { Leftbar } from "@/components/leftbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`${GeistSans.variable} ${GeistMono.variable} font-regular data-theme="light"`}
      suppressHydrationWarning
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <main className="sm:container mx-auto w-[85vw] h-auto">
          <div className="flex items-start gap-14">
            <Leftbar />
            <div className="flex-[4]">{children}</div>
          </div>
        </main>
      </ThemeProvider>
    </body>
  );
}
