import { Store } from '../Store.js'
import { message } from '../Utils.js'

const INDENTS: Record<string, number | string | undefined> = {
	'2_spaces': 2,
	'4_spaces': 4,
	tabs: '\t',
	minified: undefined,
}

const FORMATS: Record<string, {
	parse: (source: string) => string,
	stringify: (source: string, indent: string | number | undefined) => string,
}> = {
	json: {
		parse: (s) => s,
		stringify: (s, i) => {
			try {
				const data = JSON.parse(s)
				return JSON.stringify(data, null, i)
			} catch (e) {
				console.warn(`Failed to format JSON output. Falling back to source. ${message(e)}`)
				return s
			}
		},
	},
}

export function stringifySource(source: string, format?: string, indent?: string) {
	return FORMATS[format ?? Store.getFormat()].stringify(source, INDENTS[indent ?? Store.getIndent()])
}

export async function parseSource(source: string, format: string) {
	return FORMATS[format].parse(source)
}

export function getSourceIndent(indent: string) {
	return INDENTS[indent]
}

export function getSourceIndents() {
	return Object.keys(INDENTS)
}

export function getSourceFormats() {
	return Object.keys(FORMATS)
}
