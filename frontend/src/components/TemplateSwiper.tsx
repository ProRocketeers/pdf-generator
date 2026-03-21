'use client'

import { Card, CardHeader, CardContent, Button, Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useRouter } from 'next/navigation'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface Template {
  id: number
  title: string
}

export default function TemplateSwiper({ templates }: { templates: Template[] }) {
  const router = useRouter()
  const slidesPerView = Math.min(3, templates.length)

  return (
    <Box sx={{ py: 2 }}>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={24}
        slidesPerView={slidesPerView}
        style={{ paddingLeft: 0, paddingRight: 0 }}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: Math.min(3, templates.length),
          },
        }}
      >
        {templates.map((template) => (
          <SwiperSlide key={template.id}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: '0 20px 25px -5px rgba(102, 126, 234, 0.2)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  height: 120,
                  background: 'linear-gradient(135deg, #051641 0%, #0a3d7a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2.5rem',
                }}
              >
                📄
              </Box>
              <CardHeader
                title={template.title}
                sx={{
                  '& .MuiCardHeader-title': {
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1f2937',
                  },
                  pb: 1,
                }}
              />
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    router.push(`/?templateId=${template.id}`)
                  }}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                  }}
                >
                  Vybrat
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
