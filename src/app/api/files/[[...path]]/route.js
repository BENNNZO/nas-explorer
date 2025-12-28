import * as fs from 'node:fs/promises'
import nodePath from 'node:path'

const ROOT_DIR = process.env.ROOT_DIR

export async function GET(req, { params }) {
  const { path: pathSegments } = await params
  const relativePath = pathSegments?.map(decodeURIComponent).join('/') || ''
  const fullPath = nodePath.join(ROOT_DIR, relativePath)

  // Prevent directory traversal attacks
  if (!fullPath.startsWith(ROOT_DIR)) return Response.json({ error: 'Invalid Path' }, { status: '403' })

  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true })

    const contents = await Promise.all(
      entries.map(async (entry) => {
        // base item data
        const item = {
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file',
          hidden: entry.name.slice(0, 1) === '.',
        }

        // set file stats
        if (!entry.isDirectory()) {
          const stats = await fs.stat(fullPath, entry.name)

          item.size = stats.size
          item.modified = stats.mtime
          item.created = stats.ctime
        }

        return item
      })
    )

    return Response.json({ contents })
  } catch (err) {
    if (err.code === 'ENOENT') {
      return Response.json({ error: 'Folder not found' }, { status: 404 })
    }

    if (err.code === 'ENOTDIR') {
      return Response.json({ error: 'Not a directory' }, { status: 400 })
    }

    console.error('File API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}