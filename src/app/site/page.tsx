import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constant";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="absolute  bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <p className="text-center mt-36">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-[#c7c7c7] text-transparent bg-clip-text relative">
          <h1 className="text-[22vw]  font-bold text-center md:text-[300px]">SiteForge</h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-130px] mt-[-30px] ">
          <Image src="/assets/preview.png" alt="Bannerimage" height={1200} width={1200} className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted mr-6 ml-6 lg:mr-0 lg:ml-0" />
          <div className="bottom-0 top[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="fex justify-center items-center flex-col gap-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mr-2 ml-2 md:m-auto ">
          <h2 className="text-2xl  md:text-4xl font-bold tracking-tight">
            Choose what fits you right
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Our straightforward pricing plans are tailored to meet your needs. If {"you're"} not ready to commit you can get started for free.
          </p>
        </div>

        <div className="mt-24 ml-8 mr-8 md:mr-auto md:ml-auto grid grid-cols-1 md:grid-cols-2 md:items-center md:justify-center lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-end max-h-2 md:max-h-full ">
          {pricingCards.map((card) => (
            <div 
              key={card.title} 
              className={clsx(
                'relative group transition-all duration-300',
                {
                  'md:col-span-1': card.title !== 'Unlimited Saas',
                  'md:col-span-1 h-full': card.title === 'Unlimited Saas',
                  'md:-translate-y-8': card.title === 'Unlimited Saas'
                }
              )}
            >
              {card.title === 'Unlimited Saas' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  MOST POPULAR
                </div>
              )}
              
              <Card className={clsx(
                'h-full flex flex-col transition-all duration-300 border-muted/30 group-hover:border-primary/50 min-h-[470px]',
                {
                  'border-2 border-primary shadow-xl scale-[1.03]': card.title === 'Unlimited Saas',
                  'border ': card.title !== 'Unlimited Saas',
                  'min-h-[500px]': card.title === 'Unlimited Saas'
                }
              )}>
                <CardHeader className="pb-4">
                  <CardTitle className={clsx(
                    'text-2xl',
                    {
                      'text-primary': card.title === 'Unlimited Saas',
                      'text-foreground': card.title !== 'Unlimited Saas'
                    }
                  )}>
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">{card.price}</span>
                    <span className="text-muted-foreground ml-1">/m</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-6 mt-auto">
                  <div className="space-y-3 w-full">
                    {card.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className={clsx(
                          'h-5 w-5 mt-0.5 flex-shrink-0',
                          {
                            'text-primary': card.title === 'Unlimited Saas',
                            'text-muted-foreground': card.title !== 'Unlimited Saas'
                          }
                        )} />
                        <p className="text-muted-foreground/90">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/agency?plan=${card.priceId}`} 
                    className={clsx(
                      'w-full text-center p-3 rounded-md font-medium transition-all duration-300',
                      {
                        'bg-primary text-primary-foreground hover:bg-primary/90': card.title === "Unlimited Saas",
                        'bg-muted text-foreground hover:bg-muted/80': card.title !== "Unlimited Saas"
                      }
                    )}
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}