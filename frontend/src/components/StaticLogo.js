'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StaticLogo({
	className = '',
	style,
	width = 40,
	height = 40,
	withZoom = false
}) {
	return (
		<div className={`flex items-center justify-center ${className}`} style={style}>
			<motion.div
				initial={withZoom ? { scale: 1 } : false}
				animate={withZoom ? { scale: 1.7 } : false}
				transition={withZoom ? { duration: 0.3, ease: "easeOut" } : {}}
				className="w-full h-full"
			>
				<Image
					src="/images/logo2.jpg"
					alt="Supe AI Logo"
					width={width}
					height={height}
					className="w-full h-full object-contain"
					priority
				/>
			</motion.div>
		</div>
	);
}

