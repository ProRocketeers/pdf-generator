'use client'

import { Card, CardHeader, CardContent, Button } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useRouter } from 'next/navigation'

interface Template {
  id: number
  name: string
}

export default function TemplateSwiper({ templates }: { templates: Template[] }) {
  const router = useRouter()

  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      style={{ padding: "2rem" }}
    >
      {templates.map((template) => (
        <SwiperSlide key={template.id}>
          <Card raised>
            <CardHeader title={template.name} />
            <CardContent>
              <Button onClick={(e) => {
                console.log(`clicked id: ${template.id}`)
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
