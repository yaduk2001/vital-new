'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function VideoLogoFallback({
	className = '',
	sources = ['/videos/Tpwhote.mp4', '/videos/SupeAI.mp4'],
	arialabel = 'Supe AI Video Logo',
	style
}) {
	const videoRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const switchTimeoutRef = useRef(null);
	const retryCountRef = useRef(0);
	const maxRetries = 3;

	// Simplified switching without preloading for large files
	const switchToNextVideo = useCallback(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		// Clear any existing timeout
		if (switchTimeoutRef.current) {
			clearTimeout(switchTimeoutRef.current);
		}

		const nextIndex = (currentIndex + 1) % sources.length;
		const nextSource = sources[nextIndex];
		
		// Add a small delay to prevent rapid switching
		switchTimeoutRef.current = setTimeout(() => {
			videoElement.src = nextSource;
			videoElement.load();
			setCurrentIndex(nextIndex);
			setIsLoading(true);
			
			const playPromise = videoElement.play();
			if (playPromise !== undefined) {
				playPromise.catch(() => {
					// Silent fallback for autoplay restrictions
				});
			}
		}, 100);
	}, [currentIndex, sources]);

	// Handle video ended event
	const handleEnded = useCallback(() => {
		// Use a longer delay for large files to prevent lag
		setTimeout(() => {
			switchToNextVideo();
		}, 200);
	}, [switchToNextVideo]);

	// Handle video loaded event
	const handleLoadedData = useCallback(() => {
		setIsLoaded(true);
		setIsPlaying(true);
		setIsLoading(false);
		retryCountRef.current = 0; // Reset retry count on successful load
	}, []);

	// Handle video play event
	const handlePlay = useCallback(() => {
		setIsPlaying(true);
		setIsLoading(false);
	}, []);

	// Handle video pause event
	const handlePause = useCallback(() => {
		setIsPlaying(false);
	}, []);

	// Handle video loading
	const handleLoadStart = useCallback(() => {
		setIsLoading(true);
	}, []);

	// Handle video error with retry logic
	const handleError = useCallback(() => {
		setIsLoading(false);
		retryCountRef.current++;
		
		if (retryCountRef.current < maxRetries) {
			console.warn(`Video failed to load, retrying... (${retryCountRef.current}/${maxRetries})`);
			// Retry with exponential backoff
			setTimeout(() => {
				switchToNextVideo();
			}, 1000 * Math.pow(2, retryCountRef.current));
		} else {
			console.error('Video failed to load after maximum retries');
			// Try to switch to next video as fallback
			setTimeout(() => {
				switchToNextVideo();
			}, 2000);
		}
	}, [switchToNextVideo]);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		// Initialize with first video
		videoElement.src = sources[0];
		videoElement.load();
		
		// Add event listeners
		videoElement.addEventListener('ended', handleEnded);
		videoElement.addEventListener('loadeddata', handleLoadedData);
		videoElement.addEventListener('play', handlePlay);
		videoElement.addEventListener('pause', handlePause);
		videoElement.addEventListener('loadstart', handleLoadStart);
		videoElement.addEventListener('error', handleError);
		
		// Start playing with better error handling
		const playPromise = videoElement.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				// Silent fallback for autoplay restrictions
			});
		}

		return () => {
			// Clear any pending timeouts
			if (switchTimeoutRef.current) {
				clearTimeout(switchTimeoutRef.current);
			}
			
			videoElement.removeEventListener('ended', handleEnded);
			videoElement.removeEventListener('loadeddata', handleLoadedData);
			videoElement.removeEventListener('play', handlePlay);
			videoElement.removeEventListener('pause', handlePause);
			videoElement.removeEventListener('loadstart', handleLoadStart);
			videoElement.removeEventListener('error', handleError);
		};
	}, [sources, handleEnded, handleLoadedData, handlePlay, handlePause, handleLoadStart, handleError]);

	return (
		<div className={`relative ${className}`} style={style}>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
					<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
				</div>
			)}
			<video
				ref={videoRef}
				className={`w-full h-full object-cover rounded-lg ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
				muted
				playsInline
				autoPlay
				preload="metadata"
				aria-label={arialabel}
				// Performance optimizations for large files
				disablePictureInPicture
				disableRemotePlayback
				// Additional performance attributes
				webkit-playsinline="true"
				x5-playsinline="true"
				x5-video-player-type="h5"
				x5-video-player-fullscreen="false"
			/>
		</div>
	);
}
