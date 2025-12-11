import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number // milliseconds per character
  onComplete?: () => void
  onUpdate?: () => void // Called each time text updates (for scrolling)
}

export function TypewriterText({ text, speed = 15, onComplete, onUpdate }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('')
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        // Add characters in small chunks for smoother effect
        const chunkSize = Math.min(3, text.length - currentIndex) // 3 chars at a time
        const nextChunk = text.slice(currentIndex, currentIndex + chunkSize)
        setDisplayedText(prev => prev + nextChunk)
        setCurrentIndex(prev => prev + chunkSize)
        onUpdate?.() // Notify parent to scroll
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete && text.length > 0) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, onComplete, onUpdate, isComplete])

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-1.5 h-4 ml-0.5 bg-current opacity-70 animate-pulse align-middle" />}
    </span>
  )
}

