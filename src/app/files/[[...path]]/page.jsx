"use client"

import { use, useState, useEffect } from "react"
import api from "@/utils/api"

import FileList from "@/components/files/FileList"
import BreadCrumbs from "@/components/files/BreadCrumbs"

export default function Files({ params }) {
  const { path } = use(params)

  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    api.get(location.pathname)
      .then(res => setFiles(res.data.files))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="p-8">
      <BreadCrumbs
        path={path}
      />

      <FileList
        files={files}
      />
    </div>
  )
}