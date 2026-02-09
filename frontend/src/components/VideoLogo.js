'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function VideoLogo({
	className = '',
	sources = [
		{ mp4: '/videos/Tpwhote.mp4' },
		{ mp4: '/videos/SupeAI.mp4' }
	],
	arialabel = 'Supe AI Video Logo',
	style
}) {
	const videoRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const preloadedVideosRef = useRef(new Map());
	const switchTimeoutRef = useRef(null);
	const animationFrameRef = useRef(null);
	const lastSwitchTimeRef = useRef(0);

	// Get the best available source for current browser
	const getBestSource = useCallback((sourceObj) => {
		if (typeof sourceObj === 'string') {
			return sourceObj; // Fallback for string sources
		}
		
		// For now, prioritize MP4 since WebM files don't exist yet
		// TODO: Once WebM files are created, uncomment the WebM detection code below
		/*
		// Check if WebM is supported (better compression)
		const video = document.createElement('video');
		if (video.canPlayType && video.canPlayType('video/webm; codecs="vp9"').replace(/no/, '')) {
			return sourceObj.webm || sourceObj.mp4;
		}
		*/
		
		return sourceObj.mp4;
	}, []);

	// Simplified preload function - only preload metadata
	const preloadVideo = useCallback((sourceObj) => {
		const src = getBestSource(sourceObj);
		
		if (preloadedVideosRef.current.has(src)) {
			return preloadedVideosRef.current.get(src);
		}

		const video = document.createElement('video');
		video.muted = true;
		video.playsInline = true;
		video.preload = 'metadata'; // Only preload metadata to reduce memory usage
		video.src = src;
		
		// Store the preloaded video
		preloadedVideosRef.current.set(src, video);
		
		return video;
	}, [getBestSource]);

	// Preload all videos on mount
	useEffect(() => {
		sources.forEach(sourceObj => preloadVideo(sourceObj));
		
		// Cleanup preloaded videos on unmount
		return () => {
			preloadedVideosRef.current.forEach(video => {
				video.src = '';
				video.load();
			});
			preloadedVideosRef.current.clear();
		};
	}, [sources, preloadVideo]);

	// Optimized switching with throttling
	const switchToNextVideo = useCallback(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		// Throttle switching to prevent rapid changes
		const now = Date.now();
		if (now - lastSwitchTimeRef.current < 500) {
			return;
		}
		lastSwitchTimeRef.current = now;

		// Clear any existing timeout
		if (switchTimeoutRef.current) {
			clearTimeout(switchTimeoutRef.current);
		}

		// Use a simpler switching method
		const nextIndex = (currentIndex + 1) % sources.length;
		const nextSourceObj = sources[nextIndex];
		const nextSource = getBestSource(nextSourceObj);
		
		// Simple source switching without complex preloading checks
		videoElement.src = nextSource;
		setCurrentIndex(nextIndex);
		
		// Use a longer delay for smoother transitions
		switchTimeoutRef.current = setTimeout(() => {
			const playPromise = videoElement.play();
			if (playPromise !== undefined) {
				playPromise.catch(() => {
					// Silent fallback for autoplay restrictions
				});
			}
		}, 100);
	}, [currentIndex, sources, getBestSource]);

	// Simplified event handlers with reduced state updates
	const handleEnded = useCallback(() => {
		// Use a simple timeout instead of requestAnimationFrame for better performance
		setTimeout(() => {
			switchToNextVideo();
		}, 50);
	}, [switchToNextVideo]);

	const handleLoadedData = useCallback(() => {
		setIsLoaded(true);
		setIsPlaying(true);
		setIsLoading(false);
	}, []);

	const handlePlay = useCallback(() => {
		setIsPlaying(true);
		setIsLoading(false);
	}, []);

	const handlePause = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const handleLoadStart = useCallback(() => {
		setIsLoading(true);
	}, []);

	// Simplified error handling
	const handleError = useCallback(() => {
		setIsLoading(false);
		console.warn('Video failed to load, trying next source...');
		// Simple retry with delay
		setTimeout(() => {
			switchToNextVideo();
		}, 1000);
	}, [switchToNextVideo]);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		// Initialize with first video
		const initialSource = getBestSource(sources[0]);
		videoElement.src = initialSource;
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
			// Clear any pending timeouts and animation frames
			if (switchTimeoutRef.current) {
				clearTimeout(switchTimeoutRef.current);
			}
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			
			videoElement.removeEventListener('ended', handleEnded);
			videoElement.removeEventListener('loadeddata', handleLoadedData);
			videoElement.removeEventListener('play', handlePlay);
			videoElement.removeEventListener('pause', handlePause);
			videoElement.removeEventListener('loadstart', handleLoadStart);
			videoElement.removeEventListener('error', handleError);
		};
	}, [sources, getBestSource, handleEnded, handleLoadedData, handlePlay, handlePause, handleLoadStart, handleError]);

	return (
		<div className={`relative ${className}`} style={style}>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
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
				// Performance optimizations
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


