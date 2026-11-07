import type { DocAndNode } from '@spyglassmc/core'

export * from './LootTablePreview.jsx'

export interface PreviewProps {
	docAndNode: DocAndNode
	shown: boolean
}
