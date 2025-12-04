import { useState } from 'react'
import { FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useConversationFiles, useFileDownload } from '@/hooks/queries/useChatQueries'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import type { ConversationFile } from '@/types/chat.types'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker - use unpkg CDN with matching version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export function PDFViewer() {
  const activeConversationId = useAppStore(state => state.activeConversationId)
  const { data: files, isLoading } = useConversationFiles(activeConversationId || '')
  
  const [selectedFile, setSelectedFile] = useState<ConversationFile | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(0.75)
  
  // Use cached file download query
  const { data: fileData, isLoading: loadingFile } = useFileDownload(selectedFile?.id || null)

  const isImage = (mimeType: string) => mimeType.startsWith('image/')
  const isPDF = (mimeType: string) => mimeType === 'application/pdf'

  const handleFileClick = (file: ConversationFile) => {
    setSelectedFile(file)
    setPageNumber(1)
    setScale(0.75)
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully, pages:', numPages)
    setNumPages(numPages)
  }

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error)
  }

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1))
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(2.0, prev + 0.25))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.25))
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Preview Area - Takes most of the space */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8 pt-4 overflow-auto">
        {loadingFile ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mb-4"></div>
            <p className="text-sm">Loading file...</p>
          </div>
        ) : !selectedFile || !fileData ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <FileText className="h-24 w-24 mb-4" strokeWidth={1} />
            <p className="text-lg font-medium">File Preview</p>
            <p className="text-sm">Select a file to preview</p>
          </div>
        ) : isImage(selectedFile.mime_type) ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img
              src={fileData.url}
              alt={selectedFile.filename}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          </div>
        ) : isPDF(selectedFile.mime_type) ? (
          <div className="flex flex-col items-center w-full h-full">
            {/* PDF Controls */}
            <div className="flex items-center gap-2 mb-3 bg-white dark:bg-gray-800 rounded-md px-2 py-1 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              
              <span className="text-xs font-medium">
                {pageNumber} / {numPages}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              
              <span className="text-xs font-medium min-w-[40px] text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleZoomIn}
                disabled={scale >= 2.0}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>

            {/* PDF Document */}
            <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <Document
                file={fileData.url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                  </div>
                }
                error={
                  <div className="flex flex-col items-center justify-center p-8 text-red-500">
                    <p>Failed to load PDF</p>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-md"
                />
              </Document>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <FileText className="h-24 w-24 mb-4" strokeWidth={1} />
            <p className="text-lg font-medium">Preview not available</p>
            <p className="text-sm">File type: {selectedFile.mime_type}</p>
          </div>
        )}
      </div>

      {/* File Carousel - Horizontal Scrollable */}
      <div className="border-t bg-white dark:bg-gray-950 p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <p className="text-sm">Loading files...</p>
          </div>
        ) : !files || files.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <p className="text-sm">No files uploaded</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {files.map((file) => {
                const isSelected = selectedFile?.id === file.id
                const isImageFile = isImage(file.mime_type)
                
                return (
                  <button
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`flex-shrink-0 w-24 h-24 cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-950/40'
                        : 'border-0 hover:border-2 hover:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/30'
                    }`}
                  >
                    {isImageFile ? (
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <ImageIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 mb-2">
                        <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    )}
                    <p className="text-xs truncate w-full text-center">
                      {file.filename}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

