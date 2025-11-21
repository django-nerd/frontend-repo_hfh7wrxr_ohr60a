import { X, Trash2 } from "lucide-react"

function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-slate-800">Your cart</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 border rounded-lg p-3">
                <div className="w-16 h-16 bg-slate-100 rounded overflow-hidden">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800 leading-tight">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.brand}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-800">${item.price?.toFixed(2)}</div>
                  <button onClick={() => onRemove(idx)} className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t bg-slate-50">
          <button
            onClick={onCheckout}
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold disabled:opacity-50"
            disabled={items.length === 0}
          >
            Send inquiry
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
