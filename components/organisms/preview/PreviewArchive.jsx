import React, { useState } from 'react';
import ImageViewer from '../../../utils/ImageViewer';
import PropTypes from 'prop-types';

const PreviewArchive = ({ archive, name }) => {
        const [page, setPage] = useState(0);
        const type = name.includes('.pdf');
        return archive ? (
          <div
            className="m-12px p-12px h250px w100"
            style={{
              flex: '1 1 auto',
              overflow: 'hidden',
            }}
          >
            <ImageViewer
              imageName={name}
              src={archive}
              rotationIncrement={90}
              scaleIncrement={0.5}
              showControls={true}
              isFullscreen
              docType={type ? 'pdf' : 'img'}
              onDocumentLoadSuccess={({ numPages }) => {
                setPage(numPages);
              }}
              pageNumber={page}
            />
          </div>
        ) : (
          ''
        );  
};

PreviewArchive.propTypes = {
  archive: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PreviewArchive;