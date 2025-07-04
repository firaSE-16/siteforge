import Navigation from "@/components/site/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import {dark} from "@clerk/themes"
const layout = ({children}:{children:React.ReactNode}) => {
  return (
  <ClerkProvider appearance={{ baseTheme: dark }}> 
  <Navigation/>
    {children}
    </ClerkProvider>
  )
    
};

export default layout;
