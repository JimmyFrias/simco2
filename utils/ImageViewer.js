import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/custom.css';
import Icon from '@material-ui/core/Icon';
import PdfViewer from './pdfViewer/pdfViewer';

export class ImageViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            scale: 1,
            angleFS: 0,
            scaleFS: 1,
            isFullscreen: false,
            isDragging: false,
            dragX: 0,
            dragY: 0,
            dragXFS: 0,
            dragYFS: 0,
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.src !== this.props.src ||
            prevProps.pageNumber !== this.props.pageNumber
        ) {
            this.resetValues();
        }
    }

    resetValues = () => {
        const { angle } = this.state;
        const angleOffset = angle % 360;
        this.setState({
            angle: angle - angleOffset,
            scale: 1,
            angleFS: 0,
            scaleFS: 1,
            isFullscreen: false,
            isDragging: false,
            dragX: 0,
            dragY: 0,
            dragXFS: 0,
            dragYFS: 0,
        });
    };

    controls = ['zoom_in', 'zoom_out', 'download', 'fullscreen', 'rotate'];

    scaleUp = () => {
        const state = this.state.isFullscreen ? 'scaleFS' : 'scale';
        const scale = this.state[state] + this.props.scaleIncrement;
        if (scale > 0 && scale <= 8) this.setState({ [state]: scale });
    };

    scaleDown = () => {
        const state = this.state.isFullscreen ? 'scaleFS' : 'scale';
        const scale = this.state[state] - this.props.scaleIncrement;
        if (scale > 0 && scale <= 8) this.setState({ [state]: scale });
    };

    rotate = () => {
        const state = this.state.isFullscreen ? 'angleFS' : 'angle';
        const angle = this.state[state] + this.props.rotationIncrement;
        this.setState({ [state]: angle });
    };

    fullscreen = () => {
        this.setState({ isFullscreen: true, angleFS: 0, scaleFS: 1, dragXFS: 0, dragYFS: 0 });
    };

    download = () => {
        const { documentPrefix, folioVale } = this.props;
        const linkSource = `data:application/pdf;base64,${this.props.src}`;
        const downloadLink = document.createElement('a');
        const fileName = `${documentPrefix}-${folioVale}`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    onWheel = (direction) => {
        if (direction > 0) {
            this.scaleDown();
        } else if (direction < 0) {
            this.scaleUp();
        }
    }

    dragStart = () => this.setState({ isDragging: true })

    dragEnd = () => this.setState({ isDragging: false })

    drag = (moveX, moveY) => {
        const { isDragging, isFullscreen, scale, scaleFS } = this.state;
        const stateX = isFullscreen ? 'dragXFS' : 'dragX';
        const stateY = isFullscreen ? 'dragYFS' : 'dragY';
        const scaleRate = isFullscreen ? scaleFS : scale;
        if ( isDragging ) {
            this.setState(oldState => ({
                [stateX]: this.clamp(oldState[stateX] + (moveX / scaleRate), -200, 200),
                [stateY]: this.clamp(oldState[stateY] + (moveY / scaleRate), -200, 200),
            }));
        }
    }

    clamp = (x, min, max) => Math.min(Math.max(x, min), max)

    control = (control, key, style) => {
        let onClick = () => {};
        switch (control) {
            case 'zoomInwhite':
            case 'zoom_in':
                onClick = this.scaleUp;
                break;
            case 'zoomOutwhite':
            case 'zoom_out':
                onClick = this.scaleDown;
                break;
            case 'rotatewhite':
            case 'rotate':
                onClick = this.rotate;
                break;
            case 'download':
                onClick = this.download;
                break;
            case 'fullscreen':
                onClick = this.fullscreen;
                break;
        }
        return (
            <div
                key={key}
                style={{ ...style, cursor: 'pointer' }}
                onClick={onClick}
            >
                <Icon style={{fontSize: '30px'}}>{control}</Icon>
            </div>
        );
    };

    fullscreenOverlay = () => {
        const {
            src,
            showControls,
            imageName,
            pageNumber,
            onDocumentLoadSuccess,
            docType,
        } = this.props;
        const { scaleFS, angleFS, dragXFS, dragYFS } = this.state;
        return (
            <div>
                <div
                    id="dialog-overlay"
                    className="dialog-overlay bg-42-80"
                ></div>
                <div id="fullscreen-img" className="dialog-overlay opaque">
                    <div
                        style={{
                            position: 'relative',
                            height: '100%',
                            zIndex: 12,
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {docType && docType.toLowerCase() == 'pdf' ? (
                                <div
                                    style={{
                                        transform: `rotate(${ angleFS ? angleFS : 0 }deg) scale(${ scaleFS ? scaleFS : 1 }) translate(${ dragXFS ? dragXFS : 0 }px, ${ dragYFS ? dragYFS : 0 }px)`,
                                        transition: 'all 0.5s ease',
                                    }}
                                >
                                    <PdfViewer
                                        url={src}
                                        pageNumber={pageNumber ? pageNumber : 1}
                                        onDocumentLoadSuccess={
                                            onDocumentLoadSuccess
                                                ? onDocumentLoadSuccess
                                                : () => {}
                                        }
                                    />
                                </div>
                            ) : (
                                <img
                                    style={{
                                        transform: `rotate(${ angleFS ? angleFS : 0 }deg) scale(${ scaleFS ? scaleFS : 1 }) translate(${ dragXFS ? dragXFS : 0 }px, ${ dragYFS ? dragYFS : 0 }px)`,
                                        transition: 'all 0.5s ease',
                                    }}
                                    src={'data:image/attachment;base64,' + src}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '75px',
                            width: '100%',
                            zIndex: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '2px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#424242',
                                padding: '8px 0px 8px 16px',
                                display: showControls ? 'flex' : 'none',
                            }}
                        >
                            {showControls
                                ? this.controls.map((control, key) =>
                                      control != 'fullscreen'
                                          ? this.control(
                                                control + 'white',
                                                key,
                                                { marginRight: '16px' }
                                            )
                                          : ''
                                  )
                                : ''}
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '72px',
                            width: '100%',
                            zIndex: 12,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            padding: '24px',
                        }}
                    >
                        <div
                            style={{
                                marginLeft: '10px',
                                cursor: 'pointer',
                                borderRadius: '100px',
                                padding: '8px 10px',
                                backgroundColor: 'rgba(66, 66, 66, 0.4)',
                            }}
                            onClick={() => {
                                this.setState({ isFullscreen: false });
                            }}
                        >
                            <Icon>arrowLeftWhite</Icon>
                        </div>
                        {imageName ? (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ marginLeft: '16px' }}>
                                  <Icon>galleryWhite</Icon>
                                </div>
                                <div
                                    style={{
                                        marginLeft: '16px',
                                        color: 'white',
                                    }}
                                >
                                    {imageName}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {
            src,
            showControls,
            docType,
            onDocumentLoadSuccess,
            pageNumber,
        } = this.props;
        const { angle, scale, isFullscreen, isDragging, dragX, dragY } = this.state;
        return (
            <div
                className="radius-4px noSelection"
                style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    backgroundColor: '#eeeeee',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    ref={(el) => (this.smallRef = el)}
                    onWheel={ e => this.onWheel(e.deltaY) }
                    onMouseDown={ () => this.dragStart() }
                    onMouseUp={ () => this.dragEnd()}
                    onMouseLeave={ () => this.dragEnd() }
                    onMouseMove={ e => this.drag(e.movementX, e.movementY)}
                >
                    {docType && docType.toLowerCase() == 'pdf' ? (
                        <div
                            style={{
                                transform: `rotate(${ angle ? angle : 0 }deg) scale(${ scale ? scale : 1 }) translate(${ dragX ? dragX : 0 }px, ${ dragY ? dragY : 0 }px)`,
                                transition: isDragging ? 'none' : 'all 0.5s ease',
                            }}
                        >
                            <PdfViewer
                                url={src}
                                pageNumber={pageNumber ? pageNumber : 1}
                                onDocumentLoadSuccess={
                                    onDocumentLoadSuccess
                                        ? onDocumentLoadSuccess
                                        : () => {}
                                }
                                height={
                                    this.smallRef
                                        ? this.smallRef.clientHeight
                                        : 0
                                }
                            />
                        </div>
                    ) : (
                        <img
                            style={{
                                transform: `rotate(${ angle ? angle : 0 }deg) scale(${ scale ? scale : 1 }) translate(${ dragX ? dragX : 0 }px, ${ dragY ? dragY : 0 }px)`,
                                transition: 'all 0.5s ease',
                                maxWidth: this.smallRef
                                    ? this.smallRef.clientWidth
                                    : 0,
                                maxHeight: this.smallRef
                                    ? this.smallRef.clientHeight
                                    : 0,
                            }}
                            src={'data:image/attachment;base64,' + src}
                        />
                    )}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        borderRadius: '2px',
                        top: '8px',
                        right: '8px',
                        zIndex: 2,
                        padding: '16px 8px 0px',
                        display: showControls ? 'block' : 'none',
                    }}
                >
                    {showControls
                        ? this.controls.map((control, key) =>
                              this.control(control, key, {
                                  marginBottom: '20px',
                              })
                          )
                        : ''}
                </div>
                {isFullscreen ? this.fullscreenOverlay() : ''}
            </div>
        );
    }
}

ImageViewer.propTypes = {
    src: PropTypes.string.isRequired,
    documentPrefix: PropTypes.string,
    folioVale: PropTypes.string.isRequired,
    scaleIncrement: PropTypes.number,
    rotationIncrement: PropTypes.number,
    showControls: PropTypes.bool,
    imageName: PropTypes.string,
    docType: PropTypes.string,
    pageNumber: PropTypes.number,
    onDocumentLoadSuccess: PropTypes.func,
};

ImageViewer.defaultProps = {
    documentPrefix: 'Documento',
};

export default ImageViewer;
