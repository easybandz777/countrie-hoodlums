export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-[#CCCCCC] leading-relaxed [&_h1]:text-cream [&_h1]:font-[family-name:var(--font-display)] [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:font-bold [&_h1]:tracking-wide [&_h1]:mb-10 [&_h2]:text-cream [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[#C9A227] [&_h3]:font-semibold [&_h3]:text-sm [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:text-sm [&_p]:sm:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:text-sm [&_ul]:sm:text-base [&_li]:text-[#CCCCCC]">
        {children}
      </div>
    </div>
  );
}
