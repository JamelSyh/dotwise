import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import './styles.css';

const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  useEffect(() => {
    if (Quill && quill) {
      Quill.register('modules/blotFormatter', BlotFormatter);
    }
  }, [Quill, quill]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        console.log('Text change!');
        console.log(delta);

        let currentContents = quill.getContents();
        console.log(currentContents.diff(oldContents));
      });
    }
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
