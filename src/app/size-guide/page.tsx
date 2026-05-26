"use client";

import { useState } from "react";

type ProductType = "tshirts" | "hoodies" | "hats";

const tshirtData = [
  { size: "S", chest: "18", length: "28", sleeve: "8" },
  { size: "M", chest: "20", length: "29", sleeve: "8.5" },
  { size: "L", chest: "22", length: "30", sleeve: "9" },
  { size: "XL", chest: "24", length: "31", sleeve: "9.5" },
  { size: "2XL", chest: "26", length: "32", sleeve: "10" },
  { size: "3XL", chest: "28", length: "33", sleeve: "10.5" },
];

const hoodieData = [
  { size: "S", chest: "20", length: "26", sleeve: "24" },
  { size: "M", chest: "22", length: "27", sleeve: "25" },
  { size: "L", chest: "24", length: "28", sleeve: "26" },
  { size: "XL", chest: "26", length: "29", sleeve: "27" },
  { size: "2XL", chest: "28", length: "30", sleeve: "28" },
  { size: "3XL", chest: "30", length: "31", sleeve: "29" },
];

const hatData = [
  { size: "S/M", circumference: "21.5 - 22.5" },
  { size: "L/XL", circumference: "23 - 24" },
  { size: "One Size", circumference: "22 - 24 (adjustable)" },
];

const tabs: { key: ProductType; label: string }[] = [
  { key: "tshirts", label: "T-Shirts" },
  { key: "hoodies", label: "Hoodies" },
  { key: "hats", label: "Hats" },
];

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<ProductType>("tshirts");

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-cream text-center mb-12 tracking-wide">
          SIZE GUIDE
        </h1>

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                activeTab === tab.key
                  ? "bg-[#C9A227] text-black border-[#C9A227]"
                  : "bg-transparent text-cream border-[#333] hover:border-[#C9A227] hover:text-[#C9A227]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tables */}
        <div className="overflow-x-auto">
          {activeTab === "tshirts" && (
            <table className="w-full border-collapse border border-[#333]">
              <thead>
                <tr className="bg-[#C9A227]">
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Chest (in)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Length (in)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {tshirtData.map((row, i) => (
                  <tr
                    key={row.size}
                    className={`border-b border-[#333] ${
                      i % 2 === 0 ? "bg-[#111]" : "bg-[#1A1A1A]"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-cream font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.chest}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.length}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "hoodies" && (
            <table className="w-full border-collapse border border-[#333]">
              <thead>
                <tr className="bg-[#C9A227]">
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Chest (in)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Length (in)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {hoodieData.map((row, i) => (
                  <tr
                    key={row.size}
                    className={`border-b border-[#333] ${
                      i % 2 === 0 ? "bg-[#111]" : "bg-[#1A1A1A]"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-cream font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.chest}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.length}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "hats" && (
            <table className="w-full border-collapse border border-[#333]">
              <thead>
                <tr className="bg-[#C9A227]">
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">Circumference (in)</th>
                </tr>
              </thead>
              <tbody>
                {hatData.map((row, i) => (
                  <tr
                    key={row.size}
                    className={`border-b border-[#333] ${
                      i % 2 === 0 ? "bg-[#111]" : "bg-[#1A1A1A]"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-cream font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* How to Measure */}
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-cream mb-6 tracking-wide">
            HOW TO MEASURE
          </h2>
          <div className="space-y-4">
            <div className="border border-[#333] bg-[#111] p-5">
              <h3 className="text-[#C9A227] font-semibold text-sm uppercase tracking-wider mb-1">
                Chest
              </h3>
              <p className="text-gray-300 text-sm">
                Measure across the chest 1 inch below the armhole.
              </p>
            </div>
            <div className="border border-[#333] bg-[#111] p-5">
              <h3 className="text-[#C9A227] font-semibold text-sm uppercase tracking-wider mb-1">
                Length
              </h3>
              <p className="text-gray-300 text-sm">
                Measure from the highest point of the shoulder to the bottom hem.
              </p>
            </div>
          </div>
        </section>

        {/* Fit Note */}
        <div className="mt-10 border border-[#333] bg-[#1A1A1A] p-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-[#C9A227] font-semibold">Note:</span>{" "}
            Our tees have a relaxed, streetwear fit. If you&apos;re between sizes, size up for that oversized look.
          </p>
        </div>
      </div>
    </div>
  );
}
