import {startServer} from './application'

async function main() {
	const app = await startServer()
	const port = process.env.PORT || '4000'


	app.listen(port, () => {
		console.log('Server Running...')
	})
}


main()