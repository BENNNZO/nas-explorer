"use client"

import { use, useState, useEffect } from "react"
import api from "@/utils/api"

import FileList from "@/components/files/FileList"

export default function Files({ params }) {
  const { path } = use(params)

  const [contents, setContents] = useState([])

  useEffect(() => {
    api.get(location.pathname)
      .then(res => setContents(res.data.contents))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      Path: {JSON.stringify(path || "undefined")}

      <FileList
        contents={contents}
        path={path}
      />
    </div>
  )
}