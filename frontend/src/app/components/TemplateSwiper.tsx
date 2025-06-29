'use client'

import { Card, CardHeader, CardContent, Button } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useRouter } from 'next/navigation'

interface Template {
  id: number
  title: string
}

export default function TemplateSwiper({ templates }: { templates: Template[] }) {
  const router = useRouter()
  const slidesPerView = Math.min(3, templates.length)

  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={50}
      slidesPerView={slidesPerView}
      style={{ padding: "2rem" }}
      navigation

    >
      {templates.map((template) => (
        <SwiperSlide key={template.id}>
          <Card raised>
            <CardHeader title={template.title} />
            <CardContent>
              <Button onClick={() => {
                router.push(`/?templateId=${template.id}`)
              }}>
                Choose
              </Button>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
