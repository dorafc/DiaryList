import React from 'react';

// TODO: Rethink default color codes
const colorCodes = {
	codes : [
				{
					name : 'make',
					text : 'Make / Craft',
					color : 'teal'
				},
				{
					name : 'care',
					text : 'Self Care',
					color : 'gray'
				},
				{
					name : 'media',
					text : 'Media / Arts',
					color : 'hotpink'
				},
				{
					name : 'community',
					text : 'Community',
					color : 'limegreen'
				},
				{
					name : 'experience',
					text : 'Experience',
					color : 'orange'
				},
				{
					name : 'learning',
					text : 'Learning',
					color : 'mediumvioletred'
				}
			]
}

const ColorCodesContext = React.createContext(null)

export {ColorCodesContext, colorCodes};