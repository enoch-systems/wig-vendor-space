'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, Home, ShoppingBag, Package, ShoppingCart, HelpCircle, User, Store, Settings, LogOut, ChevronDown, CreditCard, Brush, HousePlus, ScissorsLineDashed, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'
import { useUI } from '@/contexts/ui-context'

const mobileMenuItems = [
    { name: 'My Account', href: '/profile', icon: User, customIcon: '/admin.png', hasDropdown: true },
    { name: 'Home', href: '/', icon: HousePlus },
    { name: 'Shop Wigs', href: '/shop', icon: ShoppingBag },
    { name: 'Accessories', href: '/accessories', icon: ScissorsLineDashed },
    { name: 'Check out', href: '/checkout', icon: CreditCard },
    { name: 'Help', href: '/help', icon: HelpCircle },
]

const desktopMenuItems = [
    { name: 'Home', href: '/', icon: HousePlus },
    { name: 'Shop Wigs', href: '/shop', icon: ShoppingBag },
    { name: 'Accessories', href: '/accessories', icon: ScissorsLineDashed },
    { name: 'Check out', href: '/checkout', icon: CreditCard },
    { name: 'Shopping Bag', href: '/checkout', icon: ShoppingCart, customIcon: '/shopping-bag.png' },
    { name: 'My Account', href: '/profile', icon: User, customIcon: '/admin.png', hasDropdown: true },
]

const profileDropdownItems = [
    { name: 'Enoch Chukwudi', email: 'zinnyhairs@gmail.com', isHeader: true, href: undefined as string | undefined, icon: undefined as any },
    { name: 'Manage Store', href: '/store', icon: Store },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Support', href: '/support', icon: Settings },
    { name: 'Sign out', href: '/signout', icon: LogOut, isSignOut: true },
]

export const HeroHeader = () => {
    const { profileDropdownOpen, setProfileDropdownOpen, mobileMenuOpen, setMobileMenuOpen } = useUI()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { cartCount } = useCart()
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const mobileMenuRef = React.useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false)
            }
        }

        if (profileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [profileDropdownOpen, setProfileDropdownOpen])

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mobileMenuOpen, setMobileMenuOpen])

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            {/* Backdrop overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-white/1 backdrop-blur-sm z-10 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
            <nav
                data-state={mobileMenuOpen && 'active'}
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <img src="/wig.png" alt="Logo" className="h-8 w-auto object-contain" />
                                <span className="text-lg font-semibold">Wigga</span>
                            </Link>

                            <Link
                                href="/checkout"
                                aria-label="Shopping Cart"
                                className="relative z-20 -m-2.5 -mr-20 block cursor-pointer p-2.5 lg:hidden">
                                <img src="/shopping-bag.png" alt="Shopping Cart" className="size-6 object-contain" />
                                <span className="absolute top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                    {cartCount}
                                </span>
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {desktopMenuItems.map((item, index) => (
                                    <li key={index}>
                                        {item.hasDropdown ? (
                                            <div className="relative" ref={dropdownRef}>
                                                <button
                                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                                    className={`text-black hover:text-black flex items-center gap-2 duration-150 ${item.name === 'My Account' ? 'ml-15' : ''}`}>
                                                    {item.customIcon ? (
                                                        <img src={item.customIcon} alt={item.name} className="size-4 object-cover rounded-full border border-gray-300" />
                                                    ) : (
                                                        <item.icon className="size-4" />
                                                    )}
                                                    <span>{item.name}</span>
                                                    {profileDropdownOpen ? (
                                                        <ChevronUp className="size-3 transition-transform duration-200" />
                                                    ) : (
                                                        <ChevronDown className="size-3 transition-transform duration-200" />
                                                    )}
                                                </button>
                                                {profileDropdownOpen && (
                                                    <div className="absolute top-full mt-2 right-0 space-y-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-48 z-50">
                                                        {profileDropdownItems.map((dropdownItem, dropdownIndex) => (
                                                            <div key={dropdownIndex}>
                                                                {dropdownItem.isHeader ? (
                                                                    <div className="pb-2 border-b border-gray-200 mb-2">
                                                                        <div className="font-semibold text-gray-800">{dropdownItem.name}</div>
                                                                        <div className="text-sm text-gray-600">{dropdownItem.email}</div>
                                                                    </div>
                                                                ) : dropdownItem.href ? (
                                                                    <Link
                                                                        href={dropdownItem.href}
                                                                        className={`flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 ${dropdownItem.isSignOut ? 'text-red-500' : 'text-gray-700'}`}
                                                                    >
                                                                        <dropdownItem.icon className="size-4 text-gray-500" />
                                                                        <span>{dropdownItem.name}</span>
                                                                    </Link>
                                                                ) : null}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`text-black hover:text-black flex items-center gap-2 duration-150 ${item.name === 'My Account' ? 'ml-15' : ''}`}>
                                                {(['Home', 'Shop Wigs', 'Accessories', 'Check out'].includes(item.name)) ? null : (
                                                    item.customIcon ? (
                                                        <div className="relative">
                                                            <img src={item.customIcon} alt={item.name} className="size-4 object-contain" />
                                                            {item.name === 'Shopping Bag' && (
                                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                                                                    {cartCount}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <item.icon className="size-5" />
                                                    )
                                                )}
                                                {item.name !== 'Shopping Bag' && <span>{item.name}</span>}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div ref={mobileMenuRef} className="bg-amber-900/40   in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border-gray-500/20 p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-4 text-base">
                                    {mobileMenuItems.map((item, index) => (
                                        <li key={index}>
                                            {item.hasDropdown ? (
                                                <div ref={dropdownRef}>
                                                    <button
                                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                                        className="text-black hover:text-black flex items-center gap-3 duration-150 pb-2 border-b border-amber-100 w-full justify-end">
                                                        {item.customIcon ? (
                                                            <img src={item.customIcon} alt={item.name} className="size-8 object-cover rounded-full border-2 border-amber-100" />
                                                        ) : (
                                                            <item.icon className="size-5" />
                                                        )}
                                                        <span className="text-amber-100">{item.name}</span>
                                                        {profileDropdownOpen ? (
                                                            <ChevronUp className="size-4 text-amber-100 transition-transform duration-200" />
                                                        ) : (
                                                            <ChevronDown className="size-4 text-amber-100 transition-transform duration-200" />
                                                        )}
                                                    </button>
                                                    {profileDropdownOpen && (
                                                        <div className="ml-auto mt-2 space-y-2 bg-amber-900/90 rounded-lg shadow-lg p-4 border border-amber-700/50 w-48">
                                                            {profileDropdownItems.map((dropdownItem, dropdownIndex) => (
                                                                <div key={dropdownIndex}>
                                                                    {dropdownItem.isHeader ? (
                                                                        <div className="pb-2 border-b border-amber-700/50 mb-2">
                                                                            <div className="font-semibold text-amber-100">{dropdownItem.name}</div>
                                                                            <div className="text-sm text-amber-200">{dropdownItem.email}</div>
                                                                        </div>
                                                                    ) : dropdownItem.href ? (
                                                                        <Link
                                                                            href={dropdownItem.href}
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                            className={`flex items-center gap-3 py-2 px-3 rounded hover:bg-amber-800/50 ${dropdownItem.isSignOut ? 'text-red-400' : 'text-amber-100'}`}
                                                                        >
                                                                            <dropdownItem.icon className="size-4 text-amber-200" />
                                                                            <span>{dropdownItem.name}</span>
                                                                        </Link>
                                                                    ) : null}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-white         hover:text-amber-400 flex     items-center gap-3 duration-150 pb-4 border-b-2 border-amber-900 last:border-0">
                                                    {item.customIcon ? (
                                                        <img src={item.customIcon} alt={item.name} className="size-5 object-contain" />
                                                    ) : (
                                                        <item.icon className="size-5 text-amber-100" />
                                                    )}
                                                    <span className="border-b border-gray-500/20 font-semibold">{item.name}</span>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
