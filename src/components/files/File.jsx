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
        <div className="flex gap-2 items-center">
          <img src="/icons/file-fill.svg" alt="folder icon" className="invert size-5 opacity-50" />
          <p className="whitespace-nowrap text-ellipsis overflow-hidden">{file.name}</p>
        </div>

        <div className="flex gap-2 items-center relative">
          {/* Download button */}
          <a href={downloadHref} download>
            <img
              src="/icons/download-simple.svg"
              alt="download icon"
              className="invert size-5 opacity-0 group-hover:opacity-50 hover:opacity-100"
            />
          </a>

          {/* Context menu */}
          <ContextMenu target={contextMenuTargetRef}>
            <ContextMenu.Trigger>
              <img
                src="/icons/dots-three-vertical.svg"
                alt="context menu icon"
                className="invert size-5 opacity-0 group-hover:opacity-50 hover:opacity-100"
              />
            </ContextMenu.Trigger>

            <ContextMenu.Content>
              <ContextMenu.Item href={downloadHref} download>
                <Icon name="download-simple" size={5} />
                <p>Download</p>
              </ContextMenu.Item>

              <ContextMenu.Item>
                <Icon name="pencil-simple" size={5} />
                Edit Name
              </ContextMenu.Item>

              <ContextMenu.Item>
                <Icon name="trash" size={5} />
                Delete
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </div>

      {/* File preview */}
      <div className={`hidden sm:block flex-1 rounded-md ${file.hidden ? 'bg-zinc-800/50' : 'bg-zinc-800'}`}>
      </div>
    </div>
  )
}