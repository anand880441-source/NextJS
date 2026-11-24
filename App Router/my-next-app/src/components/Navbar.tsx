import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex bg-cyan-800 text-white w-full h-10 items-center justify-center">
        <nav className="flex gap-10 font-semibold">
            <Link href='/products'>Products</Link>
            <Link href='/categories'>Categories</Link>
            <Link href='/about'>About</Link>
        </nav>
    </div>
  )
}
