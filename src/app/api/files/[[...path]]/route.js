import * as fs from 'node:fs/promises'
import nodePath from 'node:path'

import { getValidatedPath, handleFsError, isHidden } from '@/utils/api'

export async function GET(req, { params }) {
  try {
    const { path: pathSegments } = await params
    const relativePath = pathSegments?.map(decodeURIComponent).join('/') || ''
    const fullPath = getValidatedPath(relativePath)

    const entries = await fs.readdir(fullPath, { withFileTypes: true })

    const directories = entries.filter(entry => entry.isDirectory()).map(item => ({
      name: item.name,
      hidden: isHidden(item.name)
    }))

    const files = await Promise.all(
      entries.filter(entry => !entry.isDirectory()).map(async (item) => {
        const stats = await fs.stat(nodePath.join(fullPath, item.name))

        return {
          name: item.name,
          hidden: isHidden(item.name),
          size: stats.size,
          created: stats.ctime,
          last_modified: stats.mtime,
        }
      })
    )

    return Response.json({ directories, files })
  } catch (err) {
    return handleFsError(err)
  }
}