# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Developing

To begin local testing:
1. Install dependencies with `npm install`
2. Copy values from .env.example to .env (some values may need to be changed)
3. Run the mock server (see below)
4. Run the app `npm run dev -- -- open`

### Mocking API calls
Mocking API calls allows us to test frontend functionality without needing to connect to a live backend.

Mock API responses are found in [wiremock folder](/wiremock/mappings)

To use the mock API response, 
1. Add a variable to .env
```BACKEND_URL=http://localhost:8080```
2. Open a terminal in the project folder and execute the following commands
```
cd wiremock;
docker compose up
```


## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
