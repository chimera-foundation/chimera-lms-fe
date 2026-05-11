"use client";

import { useState } from "react";
import { SearchIcon, FilterIcon, CartIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { useAppSelector } from "../../redux/hooks";

const DUMMY_BOOKS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: "Introduction to Algorithms",
  author: "by Thomas H. Cormen",
  category: "Computer Science",
  description: "Comprehensive introduction to the modern study of computer algorithms.",
  isAvailable: true,
  stock: 5,
  image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
}));

export default function LibraryPage() {
  const { currentUser } = useAppSelector((x) => x.messaging);
  const [view, setView] = useState<"library" | "cart">("library");
  const [cartItems, setCartItems] = useState(DUMMY_BOOKS.slice(0, 2));

  const addToCart = (book: any) => {
    if (!cartItems.find(item => item.id === book.id)) {
      setCartItems([...cartItems, book]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Library</h1>
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setView("library")}
              className="pb-2 text-[15px] font-medium transition text-blue-600 border-b-2 border-blue-600"
            >
              Library
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

      {view === "library" ? (
        <>

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
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <button
              onClick={() => setView("cart")}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition shadow-sm w-full sm:w-auto justify-center"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {DUMMY_BOOKS.map((book) => {
              const inCart = cartItems.some(item => item.id === book.id);
              return (
                <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
                  <div className="h-56 overflow-hidden relative border-b border-gray-100">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md w-max mb-3">
                      {book.category}
                    </span>
                    <h3 className="text-[17px] font-bold text-gray-800 leading-snug mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">
                      {book.description}
                    </p>

                    <div className="flex items-center gap-2 mb-5">
                      <span className={`w-2 h-2 rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className={`text-xs font-medium ${book.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {book.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => inCart ? removeFromCart(book.id) : addToCart(book)}
                        className={`flex-1 py-2 border text-sm font-semibold rounded-md transition ${inCart ? 'border-gray-200 text-gray-400 bg-gray-50 hover:bg-gray-100' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
                      >
                        {inCart ? 'In Cart' : 'Add To Cart'}
                      </button>
                      <button className="flex-1 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition shadow-sm">
                        Borrow
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-4 pb-8">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">1-12</span> of <span className="font-medium">578</span>
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
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
              <button className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-5">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Shopping Cart</h2>
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-5 border border-gray-200 rounded-xl p-4 sm:p-5 relative transition hover:shadow-md bg-white">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1.5 rounded-md transition"
                      title="Remove"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>

                    <div className="w-full sm:w-36 h-48 sm:h-auto flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg border border-gray-100" />
                    </div>

                    <div className="flex flex-col flex-1 py-1 pr-8">
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md w-max mb-3">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-[15px] text-gray-500 mb-3">{item.author}</p>
                      <p className="text-sm text-gray-500 mb-4 max-w-md line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs font-medium text-green-600">
                          In Stock ({item.stock} available)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Books</span>
                    <span className="font-bold text-red-500 text-lg">{cartItems.length}</span>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Borrowing Period</span>
                    <span className="font-bold text-red-500 text-lg">14 days</span>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rental Fee</span>
                    <span className="font-bold text-green-500 text-lg">Free</span>
                  </div>

                  <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-[13px] p-4 rounded-lg leading-relaxed">
                    Your borrow request will be pending until approved by the library admin. You'll receive a transaction code after checkout.
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm shadow-blue-500/30">
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setView('library')}
                      className="w-full py-3 bg-white border border-gray-200 text-gray-500 font-semibold rounded-lg hover:bg-gray-50 hover:text-gray-700 transition"
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
              <p className="text-gray-500 mb-8 text-lg">Add some books to get started</p>
              <button
                onClick={() => setView('library')}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm shadow-blue-500/30"
              >
                Browse Books
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
