import { useMemo } from 'preact/hooks'
import { Footer, GeneratorCard, ToolGroup } from '../components/index.js'
import { useLocale, useTitle } from '../contexts/index.js'
import { useMediaQuery } from '../hooks/index.js'
import { Store } from '../Store.js'
import { Fragment } from 'preact'

const MIN_FAVORITES = 2
const MAX_FAVORITES = 5

interface Props {
	path?: string,
}
export function Home({}: Props) {
	const { locale } = useLocale()
	useTitle(locale('title.home'))

	const smallScreen = useMediaQuery('(max-width: 580px)')

	return <main>
		<div class="legacy-container">
			<div class="card-group">
				{smallScreen ? /* mobile */ <>
					<PopularGenerators />
					<FavoriteGenerators />
				</> : /* desktop */ <>
					<div class="card-column">
						<PopularGenerators />
					</div>
					{!smallScreen && <div class="card-column">
						<FavoriteGenerators />
					</div>}
				</>}
			</div>
			<Footer />
		</div>
	</main>
}

function PopularGenerators() {
	const { locale } = useLocale()
	return <ToolGroup title={locale('generators.popular')} link="/generators/">
		<GeneratorCard minimal id="cobblemonraiddens:raid/boss" />
		<GeneratorCard minimal id="cobblemonraiddens:raid/boss_additions" />
		<GeneratorCard minimal id="cobblemonraiddens:raid/bucket" />
        <GeneratorCard minimal id="cobblemonraiddens:loot_table/raid/tier" />
	</ToolGroup>
}

function FavoriteGenerators() {
	const { locale } = useLocale()

	const favorites = useMemo(() => {
		const history: string[] = []
		for (const id of Store.getGeneratorHistory().reverse()) {
			if (!history.includes(id)) {
				history.push(id)
			}
		}
		return history.slice(0, MAX_FAVORITES)
	}, [])

	if (favorites.length < MIN_FAVORITES) return <></>

	return <ToolGroup title={locale('generators.recent')}>
		{favorites.map(f => <GeneratorCard minimal id={f} />)}
	</ToolGroup>
}
