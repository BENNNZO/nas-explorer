import * as fs from 'node:fs/promises'
import nodePath from 'node:path'

const ROOT_DIR = process.env.ROOT_DIR

export async function GET(req, { params }) {
  const { path: pathSegments } = await params
  const relativePath = pathSegments?.map(decodeURIComponent).join('/') || ''
  const resolvedRoot = nodePath.resolve(ROOT_DIR)
  const fullPath = nodePath.resolve(resolvedRoot, relativePath)

  // Prevent directory traversal attacks
  if (!fullPath.startsWith(resolvedRoot + nodePath.sep) && fullPath !== resolvedRoot) {
    return Response.json({ error: 'Invalid Path' }, { status: 403 })
  }

  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true })

    const directories = entries.filter(entry => entry.isDirectory()).map(item => ({
      name: item.name,
      hidden: item.name[0] === '.'
    }))

    const files = await Promise.all(
      entries.filter(entry => !entry.isDirectory()).map(async (item) => {
        const stats = await fs.stat(nodePath.join(fullPath, item.name))

        return {
          name: item.name,
          hidden: item.name[0] === '.',
          size: stats.size,
          created: stats.ctime,
          last_modified: stats.mtime,
        }
      })
    )

    return Response.json({ directories, files })
  } catch (err) {
    if (err.code === 'ENOENT') {
      return Response.json({ error: 'Directory not found' }, { status: 404 })
    }

    if (err.code === 'ENOTDIR') {
      return Response.json({ error: 'Not a directory' }, { status: 400 })
    }

    console.error('File API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}