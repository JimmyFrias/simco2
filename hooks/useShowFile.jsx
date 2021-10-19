import { useState } from 'react';
import { replaceText } from '../helpers/replaceText';

const useShowFile = () => {
    const [showFileView, setShowFileView] = useState(false);

    const loadArchive = (url) => {
        const baseUrl = `http://apiscomun.concredito.io:8087/api/file/gcp?path=aclaraciones/${url}`;
        converterArchiveFormData(baseUrl).then((dataUrl) => {
            const archive = replaceText(dataUrl, ['data:image/jpeg;base64,', 'data:application/octet-stream;base64,']);
            setShowFileView({ archive: archive, name: url });
        });
    };

    const closeFileView = () => {
        setShowFileView(false);
    };

    return { showFileView, setShowFileView, loadArchive, closeFileView };
};

export default useShowFile;