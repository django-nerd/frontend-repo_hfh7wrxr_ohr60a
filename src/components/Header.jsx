import { ShoppingCart, Camera, Menu } from "lucide-react"

function Header({ cartCount, onCartToggle }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Camera className="w-6 h-6 text-blue-600" />
            <span>CCTV Shop</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={onCartToggle}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs w-5 h-5">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 rounded-md border border-slate-200 hover:bg-slate-50 md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
