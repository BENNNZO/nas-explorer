"use client"

import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"

const MenuContext = createContext(null)

function getPosition({ top, left, contentWidth }) {
  const windowWidth = window.innerWidth
  const rightSide = left + contentWidth

  if (rightSide > windowWidth) return { top, left: left - contentWidth }
  return { top, left }
}

function ContextMenu({ target, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [lastUsed, setLastUsed] = useState(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [contentWidth, setContentWidth] = useState(0)
  const triggerButtonRef = useRef()

  useEffect(() => {
    const targetElement = target?.current
    if (!targetElement) return

    function handleContextMenu(e) {
      e.preventDefault()
      e.stopPropagation()
      setPosition(getPosition({ top: e.clientY, left: e.clientX, contentWidth }))
      setLastUsed('context')
      setIsOpen(true)
    }

    function handleOutsideClick(e) {
      if (!isOpen) return
      // Always close on right-click, close on left-click only if outside trigger
      if (e.type === 'contextmenu' || !triggerButtonRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }

    targetElement.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('click', handleOutsideClick, true)
    document.addEventListener('contextmenu', handleOutsideClick, true)

    return () => {
      targetElement.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('click', handleOutsideClick, true)
      document.removeEventListener('contextmenu', handleOutsideClick, true)
    }
  }, [target, isOpen, contentWidth])

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    lastUsed,
    setLastUsed,
    position,
    setPosition,
    contentWidth,
    setContentWidth,
    triggerButtonRef,
  }), [isOpen, lastUsed, position, contentWidth])

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  )
}

function Trigger({ children }) {
  const { setIsOpen, setPosition, lastUsed, setLastUsed, contentWidth, triggerButtonRef } = useContext(MenuContext)

  function handleClick(e) {
    e.preventDefault()
    if (!triggerButtonRef?.current) return

    const { top, left, height } = triggerButtonRef.current.getBoundingClientRect()

    setPosition(getPosition({ top: top + height + 6, left, contentWidth }))
    setIsOpen(prev => {
      setLastUsed('trigger')
      if (prev && lastUsed === 'context') return true
      return !prev
    })
  }

  return (
    <button ref={triggerButtonRef} onClick={handleClick} className="cursor-pointer">
      {children}
    </button>
  )
}

function Content({ children }) {
  const { isOpen, setContentWidth, position: { left, top } } = useContext(MenuContext)
  const contentRef = useRef()
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (contentRef.current) setContentWidth(contentRef.current.clientWidth)
  }, [setContentWidth])

  useEffect(() => {
    wasOpenRef.current = isOpen
  }, [isOpen])

  const shouldAnimate = wasOpenRef.current && isOpen
  const positionTransition = {
    ease: [0.2, 1, 0.2, 1],
    duration: shouldAnimate ? 0.5 : 0
  }

  return (
    <motion.div
      ref={contentRef}
      className="z-20 fixed flex flex-col min-w-48 overflow-hidden shadow-lg rounded-md border-t border-t-zinc-700 bg-zinc-800"
      initial={{ top, left, opacity: 0 }}
      animate={{
        top,
        left,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        height: isOpen ? 'auto' : 0,
      }}
      transition={{
        top: positionTransition,
        left: positionTransition,
        duration: 0.5,
        ease: [0.2, 1, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

function Item({ children, href, onClick, ...props }) {
  const { setIsOpen } = useContext(MenuContext)
  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      type={href ? undefined : 'button'}
      className="text-left flex gap-3 items-center px-3 py-2 hover:bg-zinc-700 duration-75 cursor-pointer"
      onClick={() => {
        onClick?.()
        setIsOpen(false)
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

ContextMenu.Trigger = Trigger
ContextMenu.Content = Content
ContextMenu.Item = Item

export default ContextMenu
