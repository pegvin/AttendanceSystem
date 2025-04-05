# Attendance Portal
This is the code for Attendance Portal, This main page explains the
overall structure of the codebase. The code is divided into 2 main parts:
1. Frontend (in `frontend/`)
2. Backend (in `backend/`)

Here are the main technologies being used:
1. Frontend
   - [Bun](https://bun.sh) - A fast JS runtime & package manager.
   - [Svelte](https://svelte.dev) - It is one of the most beautiful
     ways to make reactive UI on Web.
   - [SvelteKit](https://svelte.dev/docs/kit) - Not the best, but
      a decent way to manage routing, etc with Svelte.
2. Backend
   - [PocketBase](https://pocketbase.io) - A lovely backend solution
     for our case, because of how easy it is to self-host & how many
     features it provides, Like email verification & more.

## `frontend/`
Here lies the code for the UI that connects the end-user to the
Backend. For uniformity, ease-of-maintenance & code-reuse I am
using [shadcn svelte](https://shadcn-svelte.com) which provides
beautiful components.

## `backend/`
Here lies the structure/tables/hooks for pocketbase.

# Thank You
