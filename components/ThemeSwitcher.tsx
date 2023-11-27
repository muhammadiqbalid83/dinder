'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //   useEffect only runs the client, so now we can safety show the UI
  //  in this trick we are avoiding hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <Tabs>
      <TabsList className="border dark:border-neutral-800 dark-bg-[#030303]">
        <TabsTrigger value="light" onClick={(e) => setTheme('light')}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={(e) => setTheme('dark')}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={(e) => setTheme('system')}>
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
