import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState({ category: 'All', brand: 'All', q: '' })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.category))).sort()
    return ['All', ...list]
  }, [products])

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand))).sort()
    return ['All', ...list]
  }, [products])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (filters.category !== 'All') params.append('category', filters.category)
        if (filters.brand !== 'All') params.append('brand', filters.brand)
        if (filters.q) params.append('q', filters.q)
        const res = await fetch(`${backend}/api/products?${params.toString()}`)
        const data = await res.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [backend, filters])

  const addToCart = (item) => {
    setCart(prev => [...prev, item])
    setCartOpen(true)
  }

  const removeFromCart = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx))
  }

  const checkout = async () => {
    try {
      const name = prompt('Your name?')
      if (!name) return
      const email = prompt('Your email?')
      if (!email) return

      const payload = { name, email, items: cart }
      const res = await fetch(`${backend}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Request failed')
      alert('Inquiry sent! We will contact you shortly.')
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Failed to send inquiry')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header cartCount={cart.length} onCartToggle={() => setCartOpen(true)} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">CCTV Shop</h1>
            <p className="text-slate-600">Cameras, recorders and complete kits</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={filters.q}
              onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
              placeholder="Search products..."
              className="px-3 py-2 rounded-md border border-slate-300 bg-white w-full sm:w-64"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
              className="px-3 py-2 rounded-md border border-slate-300 bg-white"
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={filters.brand}
              onChange={(e) => setFilters(f => ({ ...f, brand: e.target.value }))}
              className="px-3 py-2 rounded-md border border-slate-300 bg-white"
            >
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center h-64 text-slate-500">Loading products...</div>
        ) : error ? (
          <div className="grid place-items-center h-64 text-rose-600">{error}</div>
        ) : products.length === 0 ? (
          <div className="grid place-items-center h-64 text-slate-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
