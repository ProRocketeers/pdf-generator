import React from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import NextLink from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbsProps extends React.ComponentProps<typeof MuiBreadcrumbs> {
  items: BreadcrumbItem[]
  includeHome?: boolean
}

export default function Breadcrumbs({ items, includeHome = true, ...rest }: BreadcrumbsProps) {
  if (includeHome) {
    items = [createHomeBreadcrumb(), ...items]
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...rest}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast || !item.href) {
          return (
            <Typography
              key={item.label}
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        }

        return (
          <Link
            key={item.label}
            component={NextLink}
            href={item.href}
            underline="hover"
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}

const createHomeBreadcrumb = (): BreadcrumbItem => ({
  label: 'Home',
  href: '/',
  icon: <HomeIcon fontSize="small" />
})
