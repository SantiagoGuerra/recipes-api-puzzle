import 'reflect-metadata'
import {startServer} from './application'
import {connect} from './config/database'


async function main() {

	connect()

	const app = await startServer()
	const port = process.env.PORT || '4000'


	app.listen(port, () => {
		console.log('Server Running...')
	})
}


main()