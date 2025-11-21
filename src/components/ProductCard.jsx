function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm hover:shadow-md transition-all">
      <div className="aspect-video rounded-lg bg-slate-100 overflow-hidden mb-3">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400 text-sm">No image</div>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-800 leading-tight">{product.title}</h3>
          <p className="text-xs text-slate-500">{product.brand} • {product.category}</p>
        </div>
        <div className="text-right">
          <div className="text-blue-600 font-bold">${product.price?.toFixed(2)}</div>
          <div className={`text-xs ${product.in_stock ? 'text-emerald-600' : 'text-rose-600'}`}>{product.in_stock ? 'In stock' : 'Out of stock'}</div>
        </div>
      </div>
      {product.resolution && (
        <p className="mt-2 text-xs text-slate-600">Resolution: {product.resolution}</p>
      )}
      {product.features?.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1">
          {product.features.slice(0, 4).map((f, i) => (
            <li key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{f}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => onAdd(product)}
        className="mt-3 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 font-medium"
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard
