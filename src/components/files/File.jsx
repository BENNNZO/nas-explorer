"use client"

import { useState } from "react"

export default function File({ file }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className={`group sm:aspect-square flex flex-col gap-2 p-2 bg-zinc-900 rounded-xl ${file.hidden ? 'opacity-50' : ''}`}>
      <div className="flex justify-between">
        {/* Icon & file name */}
        <div className="flex gap-2 items-center">
          <img src="/icons/file-fill.svg" alt="folder icon" className="invert size-5 opacity-50" />
          <p className="whitespace-nowrap text-ellipsis overflow-hidden">{file.name}</p>
        </div>

        <div className="flex gap-2 items-center relative">
          {/* Download button */}
          <a href={`/api${location.pathname.replace('/files', '/download')}/${file.name}`} download>
            <img
              src="/icons/download-simple.svg"
              alt="download icon"
              className="invert size-5 opacity-0 group-hover:opacity-50 hover:opacity-100"
            />
          </a>

          {/* Context menu toggle button */}
          <button onClick={() => setMenuIsOpen(prev => !prev)} className="cursor-pointer">
            <img
              src="/icons/dots-three-vertical.svg"
              alt="context menu icon"
              className="invert size-5 opacity-0 group-hover:opacity-50 hover:opacity-100"
            />
          </button>

          {/* Context menu */}
          {menuIsOpen && (
            <>
              <div className="fixed inset-0 bg-black/25 z-10" onClick={() => setMenuIsOpen(false)} />

              <div
                onClick={() => setMenuIsOpen(false)}
                className="absolute top-full right-0 z-20 overflow-hidden whitespace-nowrap flex flex-col gap-px w-48 bg-zinc-600 rounded-md"
              >
                <a
                  className="text-left bg-zinc-700 px-2 py-1 hover:bg-zinc-600 cursor-pointer flex gap-2 items-center"
                  href={`/api${location.pathname.replace('/files', '/download')}/${file.name}`}
                  download
                >
                <img
                    src="/icons/download-simple.svg"
                    alt="download icon"
                    className="invert size-5 opacity-50"
                  />

                  <p>Download</p>
                </a>

                {/* <button className="text-left bg-zinc-700 px-2 py-1 hover:bg-zinc-600 cursor-pointer">Rename</button> */}

                {/* <button className="text-left bg-zinc-700 px-2 py-1 hover:bg-zinc-600 cursor-pointer">Delete</button> */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* File preview */}
      <div className="hidden sm:block bg-zinc-800 flex-1 rounded-md">
      </div>
    </div>
  )
}