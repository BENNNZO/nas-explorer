"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const MenuContext = createContext(null)

function getPosition({ top, left, contentWidth }) {
  const windowWidth = window.innerWidth
  const rightSide = left + contentWidth

  if (rightSide > windowWidth) return { top, left: left - contentWidth}
  return { top, left }
}

function ContextMenu({ target, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [lastUsed, setLastUsed] = useState(null) // (context | trigger)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    const targetElement = target?.current
    if (!targetElement) return

    function handleEvent(e) {
      e.preventDefault()

      const top = e.clientY
      const left = e.clientX

      setPosition(getPosition({ top, left, contentWidth }))
      setLastUsed('context')
      setIsOpen(true)
    }

    targetElement.addEventListener('contextmenu', handleEvent)

    return () => targetElement.removeEventListener('contextmenu', handleEvent)
  }, [target, isOpen, contentWidth, setPosition, setIsOpen])

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        lastUsed,
        setLastUsed,
        position,
        setPosition,
        contentWidth,
        setContentWidth,
        target
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

function Trigger({ children }) {
  const { setIsOpen, setPosition, lastUsed, setLastUsed, contentWidth } = useContext(MenuContext)

  const triggerRef = useRef()

  function handleClick(e) {
    e.preventDefault()

    if (!triggerRef?.current) return

    const { top, left, height } = triggerRef.current.getBoundingClientRect()
    const topPadding = 6

    setPosition(getPosition({ top: top + height + topPadding, left, contentWidth }))
    setIsOpen(prev => {
      if (prev && lastUsed === 'context') {
        setLastUsed('trigger')
        return true
      }

      return !prev
    })
  }

  return (
    <button
      ref={triggerRef}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </button>
  )
}

function Content({ children }) {
  const { target, isOpen, setIsOpen, setContentWidth, position: { left, right, top } } = useContext(MenuContext)
  const contentRef = useRef()
  const wasOpenRef = useRef(false) // Makes sure top, left, and right are not animated when being opened

  // Ensure it closes when clicked ouside to the target bounds
  useEffect(() => {
    wasOpenRef.current = isOpen

    const targetElement = target?.current
    if (!targetElement || !isOpen) return

    function handleOutsideClick(e) {
      if (!targetElement.contains(e.target)) setIsOpen(false)
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('contextmenu', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('contextmenu', handleOutsideClick)
    }
  }, [isOpen])

  // Setup content width state on mount
  useEffect(() => {
    const contentElement = contentRef?.current
    if (!contentElement) return

    setContentWidth(contentElement.clientWidth)
  }, [])

  const shouldAnimatePosition = wasOpenRef.current && isOpen
  const positionTransition = {
    ease: [0.2, 1, 0.2, 1],
    duration: shouldAnimatePosition ? 0.5 : 0
  }

  return (
    <motion.div
      ref={contentRef}
      className="z-20 fixed flex flex-col min-w-48 overflow-hidden shadow-lg rounded-md border-t border-t-zinc-700 bg-zinc-800"
      initial={{
        top, left, right,
        opacity: 0,
      }}
      animate={{
        top, left, right,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        height: isOpen ? 'auto' : 0,
      }}
      transition={{
        top: positionTransition,
        left: positionTransition,
        right: positionTransition,
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