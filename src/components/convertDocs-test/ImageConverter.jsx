import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';

const ImageConverter = ({ children }) => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'mi-imagen.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log('Ocurrió un error:', err);
      });
  }, [ref]);

  return (
    <div>
      <div ref={ref} style={{ border: '1px solid black', padding: '20px' }}>
        {children}
      </div>
      <button onClick={onButtonClick}>Convertir a PNG y Descargar</button>
    </div>
  );
};

export default ImageConverter;