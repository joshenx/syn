import './style.css';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { HStack, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export const ScorePDFViewer = ({ songId }: { songId: number }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedPageNumber, setRenderedPageNumber] = useState<number | null>(
    null,
  );

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function prevPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const isLoading = renderedPageNumber !== pageNumber;

  return (
    <HStack position="relative" alignItems="center" justifyContent="center">
      <IconButton
        position="absolute"
        left="2"
        aria-label="Previous page"
        icon={<ArrowLeftIcon color="var(--chakra-colors-chakra-body-bg)" />}
        disabled={pageNumber <= 1}
        onClick={prevPage}
        zIndex="overlay"
      />
      <Document
        file={`/scores/${songId}.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
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
        position="absolute"
        right="0"
        aria-label="Next page"
        icon={<ArrowRightIcon color="var(--chakra-colors-chakra-body-bg)" />}
        disabled={pageNumber >= numPages!}
        onClick={nextPage}
        zIndex="overlay"
      />
    </HStack>
  );
};
