import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function WordEditor() {

    const [content, setContent] = useState('');

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    }

    const saveDocument = () => {
        console.log(content);
    }

    return (
        <div>
            {/* <h2>Word-like Document Editor</h2> */}
            {/* <Editor
                apiKey='dbhwm867yn9vqgc9n2rmw1yvwsvn3uatedqiygdu78t4xws3'
                tinymceScriptSrc={`https://cdn.tiny.cloud/1/dbhwm867yn9vqgc9n2rmw1yvwsvn3uatedqiygdu78t4xws3/tinymce/6/tinymce.min.js`}
                initialValue={`<p>Type here...</p>`}
                init={{
                    plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    height: 500
                }}
                onEditorChange={handleEditorChange}
            />
            <button
                onClick={saveDocument}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded'
            >
                Save Document
            </button> */}
        </div>
    );
}