import './style.css';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export const ScorePDFViewer = (props:any) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<number | null>(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({numPages}:{numPages:any}) {
    setNumPages(numPages);
  }

  function changePage(offset:any) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function prevPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  
  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <HStack width="100%">
      <IconButton
        aria-label='Previous page'
        icon={<ArrowLeftIcon/>}
        disabled={pageNumber <= 1}
        onClick={prevPage}
      />
      <Document file={`${process.env.PUBLIC_URL}/scores/1.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
        {isLoading && renderedPageNumber ? (
          <Page
            key={renderedPageNumber}
            className="prevPage" 
            pageNumber={renderedPageNumber}
          />
        ) : null}
        <Page
          key={pageNumber}
          pageNumber={pageNumber} 
          onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
          />
      </Document>
      <IconButton
        aria-label='Next page'
        icon={<ArrowRightIcon/>}
        disabled={pageNumber >= numPages!}
        onClick={nextPage}
      />
    </HStack>
  )
}
