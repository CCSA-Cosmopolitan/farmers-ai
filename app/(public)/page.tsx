import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Leaf, Zap, BarChart3, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/partnerships" className="text-sm font-medium hover:underline underline-offset-4">
              Partnerships
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Revolutionizing Nigerian Farming with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    CCSA FarmAI combines cutting-edge artificial intelligence with agricultural expertise to help
                    Nigerian farmers maximize yields, reduce costs, and farm sustainably.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Farm AI Dashboard"
                  className="rounded-lg object-cover border shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Farming Solutions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our suite of AI tools helps you make data-driven decisions for your farm
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Farmers Assistant</h3>
                <p className="text-sm text-gray-500 text-center">
                  AI chatbot with Nigerian language support to answer all your farming questions
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Farm Analyzer</h3>
                <p className="text-sm text-gray-500 text-center">
                  Analyze farm size, soil type, humidity, and other variables for better planning
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Crop Analyzer</h3>
                <p className="text-sm text-gray-500 text-center">
                  Upload crop images for detailed analysis of nutritional value and growing methods
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Soil Analyzer</h3>
                <p className="text-sm text-gray-500 text-center">
                  Get detailed soil analysis and recommendations for optimal crop selection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start with our free tier and upgrade as your needs grow
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Free Tier */}
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">₦0</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">3 AI prompts per month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Basic farm analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Community support</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/register">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Standard Tier */}
              <div className="flex flex-col rounded-lg border shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Standard</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">₦5,000</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Unlimited AI prompts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Advanced farm analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Crop and soil analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Email support</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/register">
                      <Button className="w-full">Subscribe Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Premium Tier */}
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-bold">₦12,000</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Everything in Standard</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Priority processing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">Personalized recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">24/7 priority support</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/register">
                      <Button className="w-full">Subscribe Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Farmers Across Nigeria
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users are saying about CCSA FarmAI
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Adebayo Ogunlesi</h3>
                    <p className="text-sm text-gray-500">Cassava Farmer, Oyo State</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "The Soil Analyzer helped me identify the perfect fertilizer mix for my cassava farm. My yield
                  increased by 30% this season!"
                </p>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ngozi Okafor</h3>
                    <p className="text-sm text-gray-500">Rice Farmer, Anambra State</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "The Farm Analyzer gave me insights about my land that I never knew before. I've been able to optimize
                  my irrigation system and save water."
                </p>
              </div>
              <div className="flex flex-col rounded-lg border p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-1">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ibrahim Musa</h3>
                    <p className="text-sm text-gray-500">Tomato Farmer, Kano State</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "Being able to chat with the AI assistant in Hausa has been incredible. It's like having an
                  agricultural expert available 24/7."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-brand-blue text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Transform Your Farming?
                  </h2>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Join thousands of Nigerian farmers who are already using CCSA FarmAI to increase yields and farm
                    more sustainably.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                      Get Started Today
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width={500}
                  height={400}
                  alt="Happy farmers using CCSA FarmAI"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CCSA FarmAI</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/partnerships" className="text-sm font-medium hover:underline underline-offset-4">
              Partnerships
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
          </nav>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} CCSA FarmAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

