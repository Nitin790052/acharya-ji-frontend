import React, { useRef, useMemo } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';

const RichTextEditor = ({ value, onChange, placeholder = "Start typing..." }) => {
	const editor = useRef(null);

	const config = useMemo(() => ({
		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
		placeholder: placeholder || 'Start typing...',
		uploader: {
			insertImageAsBase64URI: true
		},
		minHeight: 300,
        buttons: [
            'source', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'eraser', 'brush', 'fontsize', '|',
            'paragraph', 'ul', 'ol', 'indent', 'outdent', '|',
            'font', 'subscript', 'superscript', '|',
            'align', 'undo', 'redo', '|',
            'image', 'video', 'file', 'table', 'link', '|',
            'hr', 'symbol', 'selectall', 'copyformat', '|',
            'print', 'fullsize', 'preview'
        ],
        extraButtons: ['classSpan'],
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        spellcheck: true,
        allowResizeY: true,
        allowResizeX: false,
        height: 'auto',
        minHeight: 400,
        toolbarSticky: true,
        toolbarAdaptive: false, // Force all buttons to show
        controls: {
            paragraph: {
                icon: false,
                text: 'Format',
                list: Jodit.atom({
                    p: 'Normal Text (P)',
                    h1: 'Heading 1 (Main Big)',
                    h2: 'Heading 2 (Sub)',
                    h3: 'Heading 3 (Small)',
                    h4: 'Heading 4',
                    blockquote: 'Block Quote'
                })
            }
        }
	}), [placeholder]);

	return (
		<div className="rich-text-editor-wrapper bg-white rounded-2xl overflow-hidden border border-gray-200">
			<JoditEditor
				ref={editor}
				value={value}
				config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
				onChange={newContent => {}}
			/>
		</div>
	);
};

export default RichTextEditor;
