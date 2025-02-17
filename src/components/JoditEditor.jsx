import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useSendNotification } from '../context/SendNotificationContext/SendNotificationContext';

const EditorBox = ({ placeholder }) => {
  const {setMessage} = useSendNotification();
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(()=>(
		{
			readonly: false,
			placeholder: placeholder || 'Start typings...',
            height: 300 // add this line to set the height to 300px
		}),
		[placeholder]
	);
    const handleBlur = (newContent) => {
        console.log('Text written in editor:', newContent);
        // setContent(newContent);
        setMessage(newContent);
      };

      const stripHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
      };
    
      const handleChange = (newContent) => {
        const plainText = stripHtml(newContent); // Strip HTML tags
        setContent(plainText); // Update the local state if needed
        setMessage(plainText); // Set the cleaned content to the context state
        console.log('Cleaned Text:', plainText); // Debugging purpose
      };
	return (
        <div className='mt-8'>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
        
        />
      </div>
	);
};

export default EditorBox;