"use client"

import { use, useState, useEffect } from "react"
import api from "@/utils/api"

import FileList from "@/components/files/FileList"
import BreadCrumbs from "@/components/files/BreadCrumbs"
import DirectoryList from "@/components/files/DirectoryList"

export default function Files({ params }) {
  const { path } = use(params)

  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    api.get(location.pathname)
      .then(res => {
        setDirectories(res.data.directories)
        setFiles(res.data.files)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="p-8 flex flex-col gap-8">
      <BreadCrumbs
        path={path}
      />

      <DirectoryList
        directories={directories}
        path={path}
      />

      <FileList
        files={files}
      />
    </div>
  )
}