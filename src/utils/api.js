import path from 'node:path'

const ROOT_DIR = path.resolve(process.env.ROOT_DIR)

// Check is a file or folder is hidden
export function isHidden(fileName) {
  return fileName.startsWith('.')
}

// Error handling for routes that use node:fs
export function handleFsError(err) {
  switch (err.code) {
    case 'ENOENT':
      return Response.json({ error: 'Directory not found' }, { status: 404 })
    case 'INVALID_PATH':
      return Response.json({ error: 'Invalid path' }, { status: 403 })
    case 'ENOTDIR':
      return Response.json({ error: 'Not a directory' }, { status: 400 })
    default:
      console.error('File API error:', err)
      return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Valide a path / secure again '../' | './' attacks
export function getValidatedPath(relativePath) {
  const fullPath = path.resolve(ROOT_DIR, relativePath)

  if (fullPath === ROOT_DIR || fullPath.startsWith(ROOT_DIR + path.sep)) {
    return fullPath
  }

  // Mimik the pattern of Node's filesystem errors
  const error =  new Error('Invalid path')
  error.code = 'INVALID_PATH'
  throw error
}