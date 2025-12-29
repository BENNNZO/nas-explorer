"use client"

import { use, useState, useEffect, useRef } from "react"
import api from "@/utils/axios"

import FileList from "@/components/files/FileList"
import BreadCrumbs from "@/components/files/BreadCrumbs"
import DirectoryList from "@/components/files/DirectoryList"
import ErrorMessage from "@/components/files/ErrorMessage"
import ContextMenu from "@/components/utils/ContextMenu"

export default function Files({ params }) {
  const { path } = use(params)

  const pageContainerRef = useRef()

  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(location.pathname)
      .then(res => {
        setDirectories(res.data.directories)
        setFiles(res.data.files)
      })
      .catch(err => setError(err.response.data.error))
  }, [])

  return (
    <main ref={pageContainerRef} className="max-w-7xl mx-auto min-h-screen">
      <ContextMenu target={pageContainerRef}>
        <ContextMenu.Content>
          <ContextMenu.Item>New Folder</ContextMenu.Item>
          <ContextMenu.Item>New File</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>

      <div className="p-8 flex flex-col gap-8">
        <BreadCrumbs path={path} />

        {error ? (
          <ErrorMessage error={error} />
        ) : (
          <>
            <DirectoryList directories={directories} path={path} />
            <FileList files={files} />
          </>
        )}
      </div>
    </main>
  )
}
