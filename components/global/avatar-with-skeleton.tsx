'use client'

import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { useState } from "react"

interface AvatarWithSkeletonProps {
  avatarUrl?: string | null
  size?: string
  alt?: string
}

export function AvatarWithSkeleton({ 
  avatarUrl, 
  size = "40px", 
  alt = "Avatar" 
}: AvatarWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!avatarUrl || hasError) {
    return (
      <div 
        className="bg-gray-200 rounded-full flex items-center justify-center text-gray-500"
        style={{ width: size, height: size }}
      >
        <span className="text-sm font-medium">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {isLoading && (
        <Skeleton 
          className="rounded-full"
          style={{ width: size, height: size }}
        />
      )}
      <Image
        src={avatarUrl}
        alt={alt}
        fill
        className={`rounded-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
} 