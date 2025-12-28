"use client"

import { useState, useRef } from "react"
import ContextMenu from "../utils/ContextMenu"
import Icon from "../utils/Icon"

export default function File({ file }) {
  const contextMenuTargetRef = useRef()

  const downloadHref = `/api${location.pathname.replace('/files', '/download')}/${file.name}`

  return (
    <div
      ref={contextMenuTargetRef}
      className={`group sm:aspect-square flex flex-col gap-2 p-2 ${file.hidden ? 'bg-zinc-900/50' : 'bg-zinc-900'} rounded-xl`}
    >
      <div className="flex justify-between">
        {/* Icon & file name */}
        <div className="flex gap-2 items-center overflow-hidden">
          <Icon name="file-fill" />
          <p className="whitespace-nowrap text-ellipsis overflow-hidden">{file.name}</p>
        </div>

        <div className="flex gap-2 items-center w-0 group-hover:w-auto shrink-0">
          {/* Download button */}
          <a href={downloadHref} download>
            <Icon
              name="download-simple"
              className="opacity-50 hover:opacity-100 invert"
            />
          </a>

          {/* Context menu */}
          <ContextMenu target={contextMenuTargetRef}>
            <ContextMenu.Trigger>
              <Icon
                name="dots-three-vertical"
                className="opacity-50 hover:opacity-100 invert"
              />
            </ContextMenu.Trigger>

            <ContextMenu.Content>
              <ContextMenu.Item href={downloadHref} download>
                <Icon name="download-simple" />
                <p>Download</p>
              </ContextMenu.Item>

              <ContextMenu.Item>
                <Icon name="pencil-simple" />
                Edit Name
              </ContextMenu.Item>

              <ContextMenu.Item>
                <Icon name="trash" />
                Delete
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </div>

      {/* File preview */}
      <div className={`hidden sm:block flex-1 rounded-md ${file.hidden ? 'bg-zinc-800/25' : 'bg-zinc-800/50'}`}>
      </div>
    </div>
  )
}