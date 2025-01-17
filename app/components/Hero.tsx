import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-20">
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Refurbished iPhones
              <span className="block text-purple-200">For Less</span>
            </h1>
            <p className="text-xl text-white/80">
              Premium quality. Unbeatable prices. 
              Fully tested and guaranteed.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition-colors">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image
              src="https://res.cloudinary.com/dusgnj1nc/image/upload/v1737112733/apple_apple_iphone_16_128gb_teal_l91455_26_ke6an1.png"
              alt="iPhone"
              width={500}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}