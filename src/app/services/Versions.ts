import config from '../Config.js'

export const VersionIds = ['0.10.0', '0.11.0', '0.11.1', '0.11.2', '0.11.7', '0.12.1', '0.14.0', '1.21.1'] as const
export type VersionId = typeof VersionIds[number]

export const DEFAULT_VERSION: VersionId = '0.14.0'

export function checkVersion(versionId: string, minVersionId: string | undefined, maxVersionId?: string) {
	const version = config.versions.findIndex(v => v.id === versionId)
	const minVersion = minVersionId ? config.versions.findIndex(v => v.id === minVersionId) : 0
	const maxVersion = maxVersionId ? config.versions.findIndex(v => v.id === maxVersionId) : config.versions.length - 1
	return minVersion <= version && version <= maxVersion
}
