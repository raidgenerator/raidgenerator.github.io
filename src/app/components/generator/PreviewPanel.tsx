import type { DocAndNode } from '@spyglassmc/core'
import { useErrorBoundary } from 'preact/hooks'
import { useDocAndNode } from '../../contexts/Spyglass.jsx'
import { ErrorPanel } from '../ErrorPanel.jsx'
import { LootTablePreview } from '../previews/index.js'
import { Fragment } from 'preact'

export const HasPreview = ['loot_table', 'cobblemonraiddens:loot_table/raid/tier']

type PreviewPanelProps = {
	id: string,
	docAndNode: DocAndNode | undefined,
	shown: boolean,
}
export function PreviewPanel({ id, docAndNode: original, shown }: PreviewPanelProps) {
	if (!original) return <></>

	const docAndNode = useDocAndNode(original)

	const [error, dismissError] = useErrorBoundary()

	if (error) {
		const previewError = new Error(`Preview error: ${error.message}`)
		if (error.stack) {
			previewError.stack = error.stack
		}
		return <ErrorPanel error={previewError} onDismiss={dismissError} />
	}

	return <div class="h-full">
		<PreviewContent key={id} id={id} docAndNode={docAndNode} shown={shown} />
	</div>
}

type PreviewContentProps = {
	docAndNode: DocAndNode,
	id: string,
	shown: boolean,
}
export function PreviewContent({ id, docAndNode, shown }: PreviewContentProps) {
	if (id === 'loot_table' || id === 'cobblemonraiddens:loot_table/raid/tier') {
		return <LootTablePreview {...{ docAndNode, shown }} />
	}

	return <></>
}
