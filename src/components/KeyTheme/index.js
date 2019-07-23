import React from 'react';

const colorCodes = {
	codes : [
				{
					theme : 'make',
					text : 'Make / Craft',
					color : 'teal'
				},
				{
					theme : 'care',
					text : 'Self Care',
					color : 'gray'
				},
				{
					theme : 'media',
					text : 'Media / Arts',
					color : 'hotpink'
				},
				{
					theme : 'community',
					text : 'Community',
					color : 'limegreen'
				},
				{
					theme : 'experience',
					text : 'Experience',
					color : 'orange'
				},
				{
					theme : 'learning',
					text : 'Learning',
					color : 'mediumvioletred'
				}
			]
}

const ColorCodesContext = React.createContext(null)

export {ColorCodesContext, colorCodes};