'use client'

import { useRef, useState } from 'react'

/**
 * The Our Brand film card: the brand video runs as the box background
 * (muted at first — browsers block un-muted autoplay), with a mute toggle
 * and volume slider bottom-right.
 */
export default function BrandShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.6)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    if (!next) video.volume = volume || 0.6
    setMuted(next)
  }

  const changeVolume = (value: number) => {
    const video = videoRef.current
    if (!video) return
    video.volume = value
    video.muted = value === 0
    setVolume(value)
    setMuted(value === 0)
  }

  return (
    // 16:9 at every width — the film's own aspect, so the frame is never
    // cropped and the watermark in its corner stays whole
    <figure
      className="relative m-0 mt-12 md:mt-16 overflow-hidden rounded-[20px] md:rounded-[28px] aspect-video bg-[#122559]"
      data-reveal="blur"
    >
      <video
        ref={videoRef}
        src="/vedio-bg.mp4"
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="SML brand film"
      />

      {/* darkening wash so the controls stay legible over the film */}
      <span
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,17,40,0.55)_0%,rgba(9,17,40,0.12)_38%,rgba(9,17,40,0)_65%)]"
        aria-hidden="true"
      />

      <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="grid place-items-center size-8 rounded-full text-white hover:bg-white/15 transition-colors"
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          aria-label="Video volume"
          className="w-16 md:w-20 cursor-pointer accent-[#a9cf87]"
        />
      </div>
    </figure>
  )
}
