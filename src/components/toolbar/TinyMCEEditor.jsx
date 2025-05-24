import { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form'

const TinyMCEEditor = ({ initialContent = '', control, name, rules={},}) => {
  
  const editorRef = useRef(null);  
  return (
    <div className="flex flex-col h-full border-none rounded-lg overflow-hidden shadow-sm">

      {/* Editor */}
      <div className="flex-1">
        <Controller 
          name={name}
          control={control}
          rules={rules}
          render={({field, fieldState: {error}}) => (
            <>
              <Editor
                apiKey="7xlplox4mvtj2mzn04mffbrdpu1um4mrow8hnmwxxwch9jes"
                // Get from TinyMCE dashboard
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={initialContent}
                onBlur={field.onBlur}
                onEditorChange={field.onChange}
                init={{
                base_url: '../../../tinymce/js/tinymce', // Path to your self-hosted files
                suffix: '.min',
                height: '100%',
                min_height: 300,
                menubar: false,
                plugins: 'autoresize lists link',
                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent',
                content_style: `
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    padding: 5px;
                    max-width: 800px;
                    margin:1
                    border-style: none;
                  }
                  h1 h2 h3 {
                      margin-top: 1rem;
                      margin-bottom: 0.5rem;
                  }
                  p {
                      margin-bottom: 0.1rem
                  }
      
                `,
                autoresize_bottom_margin: 50,
                autoresize_on_init: true,
                skin: 'tinymce-5',
                // content_css: 'default',
                dark_mode: true,
              }}
              />
            {error && (<p className='mt-1 text-sm text-red-600'>{error.message}</p>)}
          </>
          )}
        />
      </div>
    </div>
  );
};

export default TinyMCEEditor;