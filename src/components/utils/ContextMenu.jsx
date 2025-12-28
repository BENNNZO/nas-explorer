"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const MenuContext = createContext(null)

function getPosition({ left, right, top }) {
  if (left < right) return { top, left, right: 'auto' }
  return { top, left: 'auto', right }
}

function ContextMenu({ target, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [lastUsed, setLastUsed] = useState(null) // (context | trigger)
  const [position, setPosition] = useState({ left: 0, right: null, top: 0 })

  useEffect(() => {
    const targetElement = target?.current
    if (!targetElement) return

    function handleEvent(e) {
      e.preventDefault()

      const top = e.clientY
      const left = e.clientX
      const relativeRight = window.innerWidth - left

      setPosition(getPosition({ top, left, right: relativeRight}))
      setLastUsed('context')
      setIsOpen(true)
    }

    targetElement.addEventListener('contextmenu', handleEvent)

    return () => targetElement.removeEventListener('contextmenu', handleEvent)
  }, [target, isOpen, setPosition, setIsOpen])

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, lastUsed, setLastUsed, position, setPosition, target }}>
      {children}
    </MenuContext.Provider>
  )
}

function Trigger({ children }) {
  const { setIsOpen, setPosition, lastUsed, setLastUsed } = useContext(MenuContext)

  const triggerRef = useRef()

  function handleClick(e) {
    e.preventDefault()

    if (!triggerRef?.current) return

    const { left, right, top, height } = triggerRef.current.getBoundingClientRect()
    const relativeRight = window.innerWidth - right
    const topPadding = 6

    setPosition(getPosition({ top: top + height + topPadding, left, right: relativeRight}))
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
  const { target, isOpen, setIsOpen, position: { left, right, top } } = useContext(MenuContext)
  const wasOpenRef = useRef(false)

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

  const shouldAnimatePosition = wasOpenRef.current && isOpen
  const positionTransition = {
    ease: [0.2, 1, 0.2, 1],
    duration: shouldAnimatePosition ? 0.5 : 0
  }

  return (
    <motion.div
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