import * as fs from 'node:fs/promises'
import nodePath from 'node:path'

import { getValidatedPath, handleFsError } from '@/utils/api'
import { createReadStream } from 'node:fs'

export async function GET(req, { params }) {
  try {
    const { path: pathSegments } = await params
    const relativePath = pathSegments?.map(decodeURIComponent).join('/') || ''
    const fullPath = getValidatedPath(relativePath)
    const fileName = nodePath.basename(fullPath)

    // Make sure we are downloading a file and not a folder
    const stats = await fs.stat(fullPath)
    if (stats.isDirectory()) {
      return Response.json({ error: 'Cannot download a directory' }, { status: 400 })
    }

    const stream = createReadStream(fullPath)

    return new Response(stream, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    })
  } catch (err) {
    return handleFsError(err)
  }
}