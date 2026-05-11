"use client";

import { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  CartIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
} from "./icons";
import { useAppSelector } from "../../redux/hooks";

const STORE_ITEMS = Array.from({ length: 12 }).map((_, i) => {
  const types = [
    {
      title: "Geometry Set Complete",
      category: "School Supplies",
      price: "Rp 45,000",
      priceValue: 45000,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "English Dictionary",
      category: "Book",
      price: "Rp 145,000",
      priceValue: 145000,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "School Backpack - Official",
      category: "Merchandise",
      price: "Rp 300,000",
      priceValue: 300000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "School Jacket - Navy",
      category: "Uniform",
      price: "Rp 300,000",
      priceValue: 300000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    },
  ];
  const type = types[i % 4];
  return {
    id: i + 1,
    title: type.title,
    category: type.category,
    description: "Complete geometry tools set",
    price: type.price,
    priceValue: type.priceValue,
    image: type.image,
    available: true,
  };
});

const STORE_HISTORY_DATA = [
  {
    id: "ORD-2024-001234",
    status: "Pending Payment",
    date: "March 2nd 2025, 07.00 AM",
    items: [
      {
        name: "School Uniform - Official",
        details: "Size M • Quantity: 2",
        price: "Rp 300,000",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      },
    ],
    method: "Virtual Account BCA",
    total: "Rp 300,000",
  },
  {
    id: "ORD-2024-001234",
    status: "Pending Payment",
    date: "March 2nd 2025, 07.00 AM",
    items: [
      {
        name: "School Uniform - Official",
        details: "Size M • Quantity: 2",
        price: "Rp 300,000",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "School Uniform - Official",
        details: "Size M • Quantity: 2",
        price: "Rp 300,000",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      },
    ],
    method: "Virtual Account BCA",
    total: "Rp 600,000",
  },
  {
    id: "ORD-2024-001234",
    status: "Pending Payment",
    date: "March 2nd 2025, 07.00 AM",
    items: [
      {
        name: "School Uniform - Official",
        details: "Size M • Quantity: 2",
        price: "Rp 300,000",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      },
    ],
    method: "Virtual Account BCA",
    total: "Rp 300,000",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace("Rp", "Rp ");
};

export default function StorePage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const [activeTab, setActiveTab] = useState<"Store" | "History">("Store");
  const [view, setView] = useState<"grid" | "cart">("grid");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setModalQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const addToCartFromModal = () => {
    if (selectedItem) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === selectedItem.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += modalQuantity;
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { ...selectedItem, quantity: modalQuantity }]);
      }
      handleCloseModal();
    }
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQ = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQ };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.priceValue * item.quantity, 0);
  const serviceFee = 5000;
  const otherFee = 145000;
  const cartTotal = cartItems.length > 0 ? cartSubtotal + serviceFee + otherFee : 0;

  return (
    <div className="p-6 min-h-screen bg-slate-50 overflow-y-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Store</h1>
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab("Store");
                setView("grid");
              }}
              className={`pb-2 text-[15px] font-medium transition ${
                activeTab === "Store"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Store
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className={`pb-2 text-[15px] font-medium transition ${
                activeTab === "History"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              History
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="text-left">
            <p className="font-semibold text-gray-800 leading-tight">
              {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "John Doe"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {currentUser?.roles || "Student"}
            </p>
          </div>
        </div>
      </div>

      {activeTab === "History" ? (
        <>
          {/* History Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex w-full sm:w-auto flex-1 items-center gap-3">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md leading-5 bg-blue-50/50 placeholder-blue-300 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search subject, subtype, etc..."
                />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4262c5] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
              This week
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* History List */}
          <div className="flex flex-col gap-6 mb-8">
            {STORE_HISTORY_DATA.map((order, idx) => (
              <div key={idx} className="bg-[#d7e3fc] rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-white/40 flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[13px] font-bold text-gray-800">{order.id}</h3>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-white bg-[#eab308]">
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">{order.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-col px-6 py-4 gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 flex items-center gap-5 shadow-sm">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-sm font-bold text-gray-800 mb-1">{item.name}</h4>
                        <p className="text-[11px] text-blue-500 font-medium mb-1">{item.details}</p>
                      </div>
                      <div className="text-[15px] font-bold text-red-500">{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-white/40 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="text-[11px] text-gray-500 font-medium">
                    Payment Method: <span className="text-blue-500 font-semibold">{order.method}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 font-medium mb-1">Total Payment</span>
                    <span className="text-[19px] font-bold text-red-500 leading-none">{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : view === "grid" ? (
        <>
          {/* Top Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex w-full sm:w-auto flex-1 items-center gap-3">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md leading-5 bg-blue-50/50 placeholder-blue-300 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search subject, subtype, etc..."
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                <FilterIcon className="h-4 w-4" />
                Filter
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setView("cart")}
              className="flex items-center gap-2 px-5 py-2 bg-[#4262c5] text-white text-sm font-medium rounded-md hover:bg-blue-700 transition shadow-sm w-full sm:w-auto justify-center"
            >
              <CartIcon className="h-5 w-5" />
              My Cart
              {cartItems.length > 0 && (
                <span className="ml-1 bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {STORE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition"
              >
                <div className="h-48 overflow-hidden relative border-b border-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md w-max mb-3 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-[15px] font-bold text-gray-800 leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{item.description}</p>
                  <div className="text-[15px] font-bold text-red-500 mb-4">{item.price}</div>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-green-600">Available</span>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <button className="flex-1 py-2 border border-gray-200 text-gray-400 text-sm font-semibold rounded-md bg-gray-50 hover:bg-gray-100 transition">
                      Add To Cart
                    </button>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="flex-1 py-2 bg-[#4262c5] text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition shadow-sm"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-4 pb-8">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">1-12</span> of <span className="font-medium">578</span>
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-gray-400 hover:bg-gray-100">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm font-medium flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                2
              </button>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                3
              </button>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm font-medium flex items-center justify-center">
                4
              </button>
              <span className="px-2 text-gray-400">..</span>
              <button className="p-1 rounded text-gray-400 hover:bg-gray-100">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Cart View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side: Cart Items */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                  <button onClick={() => setView("grid")} className="text-sm font-semibold text-blue-600 hover:underline">
                    Back to Store
                  </button>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-5 border border-gray-200 rounded-xl p-4 sm:p-5 relative transition hover:shadow-md bg-white"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1.5 rounded-md transition"
                      title="Remove"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>

                    <div className="w-full sm:w-32 h-40 sm:h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-100"
                      />
                    </div>

                    <div className="flex flex-col flex-1 py-1 pr-8">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        {item.category} • Size M
                      </p>
                      <div className="text-lg font-bold text-red-500 mb-4">{item.price}</div>
                      
                      <div className="flex items-center justify-end mt-auto">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-l-md transition"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <div className="px-4 py-1.5 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[40px] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-2 text-gray-500 hover:bg-gray-50 rounded-r-md transition"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: Order Summary */}
              <div className="lg:col-span-1 mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-red-500">{formatCurrency(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold text-red-500">{formatCurrency(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Other Fee</span>
                    <span className="font-semibold text-red-500">{formatCurrency(otherFee)}</span>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold text-lg">Total</span>
                    <span className="font-bold text-red-500 text-lg">{formatCurrency(cartTotal)}</span>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <button className="w-full py-3 bg-[#4a6cf7] text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm shadow-blue-500/30">
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setView("grid")}
                      className="w-full py-3 bg-white border border-gray-200 text-gray-400 font-semibold rounded-lg hover:bg-gray-50 transition"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <CartIcon className="h-14 w-14 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 text-lg">Browse the store to add items</p>
              <button
                onClick={() => setView("grid")}
                className="px-8 py-3 bg-[#4a6cf7] text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm shadow-blue-500/30"
              >
                Browse Store
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 md:p-8 flex flex-col relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.title}</h2>
                  <p className="text-[15px] text-blue-600 font-medium mb-3">
                    {selectedItem.category} • Size M
                  </p>
                  <div className="text-2xl font-bold text-red-500 mb-6">{selectedItem.price}</div>

                  <div className="flex items-center self-end md:self-start border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="p-3 text-gray-500 hover:bg-gray-50 rounded-l-lg transition"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <div className="px-6 py-2 text-gray-800 font-semibold border-x border-gray-300 min-w-[50px] text-center">
                      {modalQuantity}
                    </div>
                    <button
                      onClick={() => setModalQuantity(modalQuantity + 1)}
                      className="p-3 text-gray-500 hover:bg-gray-50 rounded-r-lg transition"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 mb-6">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-red-500">
                    {formatCurrency(selectedItem.priceValue * modalQuantity)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-600 font-medium">Service Fee</span>
                  <span className="font-semibold text-red-500">{formatCurrency(5000)}</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-600 font-medium">Other Fee</span>
                  <span className="font-semibold text-red-500">{formatCurrency(100000)}</span>
                </div>
                <div className="w-full h-px bg-gray-100 my-1"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-bold text-lg">Total</span>
                  <span className="font-bold text-red-500 text-lg">
                    {formatCurrency(selectedItem.priceValue * modalQuantity + 5000 + 100000)}
                  </span>
                </div>
              </div>

              <button
                onClick={addToCartFromModal}
                className="w-full py-3.5 bg-[#4a6cf7] text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-sm shadow-blue-500/30 text-[15px]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
