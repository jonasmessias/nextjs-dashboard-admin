'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { NavigationOptions } from 'swiper/types'

interface GallerySliderProps {
  images: string[];
}

export function GallerySlider({ images }: GallerySliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<{ swiper: SwiperType }>(null)

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper
      const nav = swiper.params.navigation as NavigationOptions
      if (nav) {
        nav.prevEl = prevRef.current
        nav.nextEl = nextRef.current
        swiper.navigation.init()
        swiper.navigation.update()
      }
    }
  }, [images])

  if (!images.length) return null

  return (
    <div className='h-full pb-10'>
      <div className="relative w-full h-full overflow-x-clip">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={true}
          slidesPerView={1}
          className="w-full h-76 overflow-visible!"
          ref={swiperRef}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={img}
                alt={`Foto da galeria ${i + 1}`}
                fill
                className="object-cover w-full h-full rounded-2xl"
                priority={i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          ref={prevRef}
          variant="default"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          aria-label="Anterior"
          type="button"
        >
          <ArrowLeft size={16} className='text-black-900' />
        </Button>
        <Button
          ref={nextRef}
          variant="default"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          aria-label="Próxima"
          type="button"
        >
          <ArrowRight size={16} className='text-black-900' />
        </Button>
      </div>
    </div>
  )
} 