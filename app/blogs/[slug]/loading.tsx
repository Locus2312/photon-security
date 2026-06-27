export default function Loading() {
  return (
    <article className="min-h-screen bg-[#050505] pb-24">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 pt-32 relative z-10 animate-pulse">
        <header className="mb-16 text-center">
          {/* Tags Skeleton */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="h-6 w-24 bg-white/10 rounded-sm"></div>
            <div className="h-6 w-32 bg-white/10 rounded-sm"></div>
          </div>
          
          {/* Title Skeleton */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="h-12 md:h-16 w-full md:w-4/5 bg-white/10 rounded-md"></div>
            <div className="h-12 md:h-16 w-3/4 md:w-1/2 bg-white/10 rounded-md"></div>
          </div>
          
          {/* Author/Date Skeleton */}
          <div className="flex justify-center gap-3">
            <div className="h-4 w-20 bg-white/10 rounded-sm"></div>
            <div className="h-4 w-4 bg-white/10 rounded-sm"></div>
            <div className="h-4 w-24 bg-white/10 rounded-sm"></div>
          </div>
        </header>

        {/* Main Image Skeleton */}
        <div className="w-full aspect-[16/9] bg-white/5 rounded-2xl mb-16 border border-white/10"></div>

        {/* Body Text Skeleton */}
        <div className="space-y-6">
          <div className="h-5 w-full bg-white/5 rounded-md"></div>
          <div className="h-5 w-11/12 bg-white/5 rounded-md"></div>
          <div className="h-5 w-4/5 bg-white/5 rounded-md"></div>
          <div className="h-5 w-full bg-white/5 rounded-md"></div>
          <div className="h-5 w-3/4 bg-white/5 rounded-md"></div>
          <div className="h-5 w-5/6 bg-white/5 rounded-md"></div>
        </div>
        
        <div className="space-y-6 mt-12">
          <div className="h-8 w-1/3 bg-white/5 rounded-md mb-8"></div>
          <div className="h-5 w-full bg-white/5 rounded-md"></div>
          <div className="h-5 w-11/12 bg-white/5 rounded-md"></div>
          <div className="h-5 w-4/5 bg-white/5 rounded-md"></div>
        </div>
      </div>
    </article>
  )
}
