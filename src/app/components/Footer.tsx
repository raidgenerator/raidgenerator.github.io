import { useLocale } from '../contexts/index.js'
import { SOURCE_REPO_URL } from '../Utils.js'
import { Octicon } from './index.js'

interface Props {
	donate?: boolean,
}
export function Footer({ donate }: Props) {
	const { locale } = useLocale()

	return <footer>
		<p>
			<span>{locale('developed_by')} <a href="https://github.com/necro50n3" target="_blank" rel="noreferrer">NecroSo1</a></span>
		</p>
		{donate !== false && <p class="donate">
			{Octicon.heart}
			<a href="https://ko-fi.com/necroso1" target="_blank" rel="noreferrer">{locale('donate')}</a>
		</p>}
		<p>
			{Octicon.mark_github}
			<span>{locale('source_code_on')} <a href={SOURCE_REPO_URL} target="_blank" rel="noreferrer">{locale('github')}</a></span>
		</p>
        <p>
            {Octicon.mark_github}
            <span>{locale('forked_from')} <a href={'https://github.com/misode/misode.github.io'} target="_blank" rel="noreferrer">{'Misode'}</a></span>
        </p>
	</footer>
}
