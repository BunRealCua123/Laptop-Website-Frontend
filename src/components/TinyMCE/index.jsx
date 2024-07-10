import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({ name, value, onChange }) {
    // const [editorContent, setEditorContent] = useState('Welcome to TinyMCE!');

    // const handleEditorChange = (content, editor) => {
    //     setEditorContent(content);
    // };
    // console.log('editorContent', editorContent);
    return (
        <div>
            <Editor
                apiKey="q0h8s14cajdvqjuxgpvgk8c2rgo77exbx98jaekf44ql98s1"
                init={{
                    plugins:
                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar:
                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) =>
                        respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                }}
                // initialValue="Welcome to TinyMCE!"
                value={value}
                onEditorChange={onChange}
            />
            <input type="hidden" name={name} value={value} />
        </div>
    );
}
