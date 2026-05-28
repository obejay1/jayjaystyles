'use client';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { money, toggleWishlist, isInWishlist } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function ProductCard({ p }: { p: Product }) {
	const r = useRouter();
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		setLiked(isInWishlist(p.id));
		const on = () => setLiked(isInWishlist(p.id));
		if (typeof window !== 'undefined') {
			window.addEventListener('wishlist', on);
			return () => window.removeEventListener('wishlist', on);
		}
	}, [p.id]);

	const onHeart = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleWishlist(p.id);
		setLiked((v) => !v);
	};

	return (
		<div className="product-card" onClick={() => r.push('/product/' + p.id)}>
			<div style={{ position: 'relative' }}>
				<img src={p.image} className="product-img" alt={p.name} />
				<button
					className={"wishlist-btn" + (liked ? ' active' : '')}
					onClick={onHeart}
					aria-label="Toggle wishlist"
				>
					<Heart size={16} />
				</button>
			</div>

			<div className="product-name">{p.name}</div>
			<div className="price">{money(p.price)}</div>
		</div>
	);
}
