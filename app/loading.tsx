export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen blur-3xl animate-pulse" />
        </div>

        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-accent border border-primary/30 h-8 w-48 mx-auto animate-pulse" />

            <div className="space-y-4">
              <div className="h-14 md:h-20 bg-card/50 rounded-lg animate-pulse w-full" />
              <div className="h-6 bg-card/30 rounded-lg animate-pulse w-3/4 mx-auto" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="h-12 w-40 bg-primary/20 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar Skeleton */}
      <section className="w-full py-12 border-y border-border/40 bg-card/20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="h-3 w-48 bg-card/50 rounded mx-auto mb-8 animate-pulse" />
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary/20 animate-pulse" />
                <div className="h-4 w-24 bg-card/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="w-full py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="h-10 w-64 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-card/30 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-lg border border-border/40 p-6 space-y-4 animate-pulse"
              >
                <div className="h-6 w-20 bg-primary/20 rounded" />
                <div className="h-7 w-3/4 bg-card/50 rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-card/30 rounded w-full" />
                  <div className="h-4 bg-card/30 rounded w-5/6" />
                </div>
                <div className="h-4 w-24 bg-primary/20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip Skeleton */}
      <section className="w-full py-16 bg-card/30 border-y border-border/40">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-10 w-24 bg-primary/20 rounded-lg mx-auto animate-pulse" />
                <div className="h-4 w-32 bg-card/50 rounded mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Skeleton */}
      <section className="w-full py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="h-10 w-48 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-80 bg-card/30 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-lg p-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full animate-pulse" />
                  <div className="h-6 w-32 bg-card/50 rounded mx-auto animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 bg-card/30 rounded w-full animate-pulse" />
                    <div className="h-3 bg-card/30 rounded w-4/5 mx-auto animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Skeleton */}
      <section className="w-full py-20 bg-card/20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="h-10 w-56 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-72 bg-card/30 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 glass rounded-lg border border-border/40"
              >
                <div className="w-8 h-8 bg-primary/20 rounded mb-3 animate-pulse" />
                <div className="h-4 w-16 bg-card/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Skeleton */}
      <section className="w-full py-20 bg-card/20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="h-10 w-64 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-card/30 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="glass max-w-3xl mx-auto rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-primary/10 p-8 flex items-center justify-center min-h-80">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded mx-auto animate-pulse" />
                  <div className="h-4 w-32 bg-card/50 rounded mx-auto animate-pulse" />
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="h-6 w-32 bg-primary/20 rounded animate-pulse" />
                  <div className="h-7 w-full bg-card/50 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-card/30 rounded w-full animate-pulse" />
                    <div className="h-4 bg-card/30 rounded w-5/6 animate-pulse" />
                  </div>
                </div>
                <div className="h-10 w-40 bg-card/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Skeleton */}
      <section className="w-full py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="h-10 w-56 bg-card/50 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-lg p-8 md:p-12 space-y-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-primary/20 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-5 bg-card/50 rounded w-full animate-pulse" />
                <div className="h-5 bg-card/50 rounded w-5/6 animate-pulse" />
                <div className="h-5 bg-card/50 rounded w-4/6 animate-pulse" />
              </div>
              <div className="border-t border-border/40 pt-6 space-y-2">
                <div className="h-5 w-40 bg-card/50 rounded animate-pulse" />
                <div className="h-4 w-48 bg-card/30 rounded animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-8 h-8 bg-card/50 rounded-md animate-pulse" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-border animate-pulse"
                  />
                ))}
              </div>
              <div className="w-8 h-8 bg-card/50 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="w-full py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-card/30 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border border-border/40 rounded-lg p-4">
                <div className="h-5 w-3/4 bg-card/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
