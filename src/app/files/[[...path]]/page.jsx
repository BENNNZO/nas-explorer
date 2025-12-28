"use client"

import { use, useState, useEffect } from "react"
import api from "@/utils/api"

import FileList from "@/components/files/FileList"
import BreadCrumbs from "@/components/files/BreadCrumbs"
import DirectoryList from "@/components/files/DirectoryList"
import ErrorMessage from "@/components/files/ErrorMessage"

export default function Files({ params }) {
  const { path } = use(params)

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
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <BreadCrumbs
        path={path}
      />

      {error ? (
        <ErrorMessage
          error={error}
        />
      ) : (
        <>
          <DirectoryList
            directories={directories}
            path={path}
          />

          <FileList
            files={files}
          />
        </>
      )}
    </div>
  )
}