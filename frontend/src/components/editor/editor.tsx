// @ts-nocheck
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';



const Editorr = ({ onData }: any) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  return (
    // @ts-ignore
    <Editor
      apiKey='nhp9ra3035s3g91itr2eugwb58nl665i90po10o3ahzfewka'
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue="<p>enter the content here.</p>"
      required
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor image code| alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help ',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      onEditorChange={onData}
    />
  );
};

export default Editorr;
