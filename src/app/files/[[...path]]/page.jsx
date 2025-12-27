"use client"

import { use, useState, useEffect } from "react"
import api from "@/utils/api"

export default function Files({ params }) {
  const { path } = use(params)

  useEffect(() => {
    api.get(location.pathname)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      Path: {JSON.stringify(path)}
    </div>
  )
}