"use client"; // Add this at the top
import React from "react";

import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Shield,
  Brain,
  BarChart2,
  ChevronRight,
  DollarSign,
  Clock,
  Lock,
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600 font-semibold text-xl">
            <TrendingUp className="h-6 w-6" />
            <span>FinaTalk</span>
          </div>
          <div className="hidden md:flex space-x-8 text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition">
              Pricing
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => router.push("/onboard/signin")}>Sign In</Button>

            <Button onClick={() => router.push("/onboard/signup")}>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Rest of the landing page content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Your Personal AI
              <span className="text-blue-600"> Financial Advisor</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Make smarter financial decisions with our AI-powered assistant.
              Get personalized insights, real-time analysis, and expert
              recommendations 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup">
                <Button className="px-8 py-3 flex items-center justify-center">
                  Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button variant="secondary" className="px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <DollarSign className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900">$2.5M+</h3>
              <p className="text-slate-600">Saved for our users</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Clock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
              <p className="text-slate-600">AI-powered support</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Lock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900">100%</h3>
              <p className="text-slate-600">Secure & encrypted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to manage
              your finances effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Brain className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Smart Analysis
              </h3>
              <p className="text-slate-600">
                Advanced AI algorithms analyze your spending patterns and
                provide personalized insights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <BarChart2 className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Investment Tracking
              </h3>
              <p className="text-slate-600">
                Real-time monitoring of your investments with AI-powered
                recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Secure Platform
              </h3>
              <p className="text-slate-600">
                Bank-level security with advanced encryption to protect your
                financial data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making smarter financial
              decisions with FinanceAI.
            </p>
            <a href="/signup">
              <Button
                variant="secondary"
                className="bg-white text-blue-600 px-8 py-3 hover:bg-blue-50"
              >
                Get Started Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-white font-semibold text-xl mb-4">
                <TrendingUp className="h-6 w-6" />
                <span>FinanceAI</span>
              </div>
              <p className="text-sm">
                Making financial wisdom accessible to everyone through AI.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} FinanceAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
