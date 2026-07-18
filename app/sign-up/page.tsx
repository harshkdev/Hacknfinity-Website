import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"/>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"/>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.png" alt="Hacknfinity Logo" className="h-10 w-auto drop-shadow-md" />
            <span className="font-display font-bold tracking-widest text-gradient">HACKNFINITY</span>
          </div>
        </div>
        <SignUp routing="hash" appearance={{ 
          baseTheme: dark,
          variables: { 
            colorPrimary: "#a855f7", 
            colorBackground: "#0d0d12", 
            colorInputBackground: "transparent", 
            colorInputText: "white",
            colorText: "white",
            colorTextSecondary: "#a1a1aa",
          },
          elements: { 
            card: "border border-purple-500/20 shadow-xl shadow-purple-500/10",
            headerTitle: "text-white font-display",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "border border-gray-800 hover:bg-gray-800/50 text-white",
            socialButtonsBlockButtonText: "text-white font-semibold",
            dividerText: "text-gray-500",
            formFieldLabel: "text-gray-300",
            formFieldInput: "border-gray-800 text-white",
            footerActionText: "text-gray-400",
            footerActionLink: "text-purple-400 hover:text-purple-300"
          }
        }} />
      </div>
    </div>
  );
}
