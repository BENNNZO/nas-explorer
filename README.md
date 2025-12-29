# NAS Explorer

A modern web-based file explorer for Network Attached Storage systems. Browse, download, rename, and delete files through an intuitive dark-themed interface.

## Features

- **File Browsing** - Navigate directory structures with breadcrumb navigation
- **File Operations** - Download, rename, and delete files and directories
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark Theme** - Easy on the eyes with a modern zinc color palette
- **Context Menus** - Right-click support for quick file operations
- **Security** - Path validation prevents directory traversal attacks

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Axios](https://axios-http.com) for HTTP requests

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nas-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   ROOT_DIR="/path/to/your/nas/mount"
   ```

   Set `ROOT_DIR` to the directory you want to expose through the file explorer.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ROOT_DIR` | The root directory path to expose in the file explorer |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── files/[[...path]]/    # File operations API (list, rename, delete)
│   │   └── download/[[...path]]/ # File download endpoint
│   ├── files/[[...path]]/        # File browser page
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Home page
├── components/
│   ├── files/                    # File browser components
│   │   ├── BreadCrumbs.jsx       # Navigation breadcrumbs
│   │   ├── Directory.jsx         # Directory card
│   │   ├── DirectoryList.jsx     # Directory grid
│   │   ├── File.jsx              # File card with actions
│   │   ├── FileList.jsx          # File grid
│   │   └── ErrorMessage.jsx      # Error display
│   └── utils/
│       ├── ContextMenu.jsx       # Right-click menu system
│       └── Icon.jsx              # SVG icon component
└── utils/
    ├── api.js                    # Path validation & error handling
    └── axios.js                  # HTTP client configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/files/[...path]` | List directory contents |
| PATCH | `/api/files/[...path]` | Rename a file or directory |
| DELETE | `/api/files/[...path]` | Delete a file or directory |
| GET | `/api/download/[...path]` | Download a file |

## License

MIT
