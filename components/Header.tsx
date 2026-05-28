import{ArrowLeft,Bell,ShoppingBag}from'lucide-react';import Link from'next/link';

export default function Header({ title, brand = false, back = false, bell = false }: { title?: string; brand?: boolean; back?: boolean; bell?: boolean }) {
  return (
    <div className="top">
      {back && <Link className="back" href="/"><ArrowLeft /></Link>}
      <div className={brand ? 'brand' : 'page-title'}>{brand ? 'JayJayStyles' : title}</div>
      {bell && <Bell className="bell desktop-only" />}
      {brand && <ShoppingBag className="bell desktop-only" size={21} />}
    </div>
  );
}
