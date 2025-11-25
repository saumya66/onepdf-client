import { FileText, Plus } from 'lucide-react'

// Mock data for demonstration
const mockFiles = [
  {
    id: '1',
    name: 'Document_2024.pdf',
    type: 'pdf',
    pages: 12,
    size: '2.4 MB',
    thumbnail: null,
  },
  {
    id: '2',
    name: 'Report_Final.pdf',
    type: 'pdf',
    pages: 8,
    size: '1.8 MB',
    thumbnail: null,
  },
]

export function PDFViewer() {
  return (
    <div className="flex flex-col h-full">
      {/* PDF Preview Area - Takes most of the space */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <FileText className="h-24 w-24 mb-4" strokeWidth={1} />
          <p className="text-lg font-medium">PDF Preview</p>
          <p className="text-sm">Page 1 of 12</p>
        </div>
      </div>

      {/* File Carousel - Horizontal Scrollable */}
      <div className="border-t bg-white dark:bg-gray-950 p-4">
        <div className="w-full overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {mockFiles.map((file) => (
              <button
                key={file.id}
                className="flex-shrink-0 w-32 h-40 rounded-lg border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 p-3 flex flex-col items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-950/30 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                  <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs font-medium text-center line-clamp-2">
                  {file.name}
                </p>
              </button>
            ))}

            {/* Add File Button */}
            <button className="flex-shrink-0 w-32 h-40 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 mb-2 transition-colors">
                <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Add File
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

