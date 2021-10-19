import React from 'react';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';

const PdfViewer = (props) => (
    <div
        onClick={props.onClick}
        className="flex justify-content-center align-items-center"
    >
        <Document
            renderMode='svg'
            file={'data:application/pdf;base64,' + props.url}
            onLoadSuccess={props.onDocumentLoadSuccess}
            className="flex justify-content-center align-items-center"
        >
            <Page
                pageNumber={props.pageNumber}
                width={props.width}
                height={props.height}
            />
        </Document>
    </div>
);

PdfViewer.propTypes = {
    url: PropTypes.string,
    onLoadSuccess: PropTypes.func,
    pageNumber: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func,
    onDocumentLoadSuccess: PropTypes.func,
};

export default PdfViewer;
