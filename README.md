# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Developing

To begin local testing:
1. Install dependencies with `npm install`
2. Copy values from .env.example to .env (this will use test data when running locally)
3. Run the mock server (see below)
4. Run the app `npm run dev -- -- open`

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
