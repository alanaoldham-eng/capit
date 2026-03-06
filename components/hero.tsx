import Image from "next/image"

export function Hero() {
  return (
    <section className="relative w-full py-12 lg:py-20 px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
              Plug Wells. Mint Tokens.{" "}
              <span className="block">Track Progress.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Where onshore well plugging meets cryptocurrency. For every US
              onshore well plugged, one new CAPIT token is minted. Follow the
              real-time progress of well plugging efforts nationwide.
            </p>
            <button className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-lg">
              VIEW DASHBOARD
            </button>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Illustration placeholder - worker with oil derrick */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero-illustration.jpg"
                  alt="Oil well worker illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
