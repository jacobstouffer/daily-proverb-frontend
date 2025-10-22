# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Developing

To begin local testing:
1. Use node version 22 (ex. `nvm install 22; nvm use 22`)
2. Install dependencies with `npm install`
3. Copy values from .env.example to .env (this will use test data when running locally)
4. Run the app `npm run dev -- -- open`

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
