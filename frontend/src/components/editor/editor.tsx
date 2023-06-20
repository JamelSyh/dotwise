import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Editor = ({ onData }: any) => {


  const [text, setText] = useState('');

  const handleChange = (value: any) => {
    setText(value);
    onData(value);
  };


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  console.log(text);

  return (
    <div style={{ height: "250px" }}>
      <ReactQuill
        style={{ height: "80%" }}
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
