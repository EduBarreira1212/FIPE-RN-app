# FIPE-EXPO-app

FIPE-EXPO-app is a React Native application built with Expo and TypeScript that provides vehicle price lookup using FIPE data (Brazilian vehicle price reference). This repository contains the mobile app's source, authentication flows, and UI components styled with Tailwind via NativeWind.

## Table of contents

- About
- Tech stack
- Project structure
- Getting started
  - Requirements
  - Install dependencies
  - Environment variables
  - Running the app (dev and production)
- Scripts
- Architecture and key modules
  - Navigation and routing
  - Auth flow
  - Services and API
  - UI components
  - Forms and validation
  - Styling and Tailwind/NativeWind
- TypeScript and editor configuration
  - Common TypeScript issues and fixes
    - "Text cannot be used as a JSX component" error
  - NativeWind / Tailwind linter warnings
- Testing (suggested)
- Troubleshooting
- Contributing
- License

## About

This app lets users search FIPE vehicle prices by plate or model, save history, and manage their profile. It's structured for clarity and rapid development.

## Tech stack

- Expo (managed workflow)
- React Native
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- React Hook Form + Zod for validation
- Expo Router for navigation
- Axios or fetch wrapper in `src/services/httpClient.ts`

## Project structure

Important files and folders:

- `index.ts` - Expo entry
- `app/` - Expo Router pages and layouts
- `src/` - application source
  - `app/` - app screens (public and private)
  - `auth/` - auth utilities (token storage)
  - `components/` - UI components
  - `contexts/` - React contexts (Auth)
  - `hooks/` - custom hooks (useAuth)
  - `schemas/` - Zod schemas for forms
  - `services/` - API client and services
  - `styles/` - global CSS for NativeWind
  - `utils/` - helper utilities

## Getting started

### Requirements

- Node.js (LTS recommended, e.g. 18.x or 20.x)
- npm or Yarn
- Expo CLI (optional) and EAS CLI if you use EAS builds
- Android Studio / Xcode if testing on emulators/simulators

### Install dependencies

```bash
npm install
# or
# yarn
```

### Environment variables

Create an `.env` or similar file if your project expects API endpoints or keys. This repository includes `src/services/httpClient.ts` where base URLs are configured; adapt accordingly.

### Running the app (development)

To run the app in development mode with Expo:

```bash
npm start
# or
# npx expo start
```

To run on Android emulator or connected device:

```bash
npm run android
```

To run on iOS simulator (macOS/Xcode required):

```bash
npm run ios
```

If you use EAS for builds, consult `eas.json` for build profiles.

## Scripts

Open `package.json` to view available scripts. Typical scripts include `start`, `android`, `ios`, `web`, and `eas` related scripts.

## Architecture and key modules

### Navigation and routing

This app uses Expo Router. Pages live in `app/` and use nested layouts for public and private routes. See `src/app/_layout.tsx` and the `(private)` / `(public)` folders.

### Auth flow

Auth is handled via `src/contexts/AuthContext.tsx` and `src/hooks/useAuth.ts`. The `SignInForm` component uses `useAuth().signIn` to authenticate and store tokens in `src/auth/tokenStorage.ts`.

### Services and API

`src/services/httpClient.ts` contains the HTTP client with base URL and interceptors.

### UI components

Common components are in `src/components/`. They use NativeWind classes (e.g., `className="..."`) and are typed for React Native.

### Forms and validation

Forms use `react-hook-form` and `zod` via `@hookform/resolvers/zod`. Schemas are in `src/schemas/`.

### Styling and Tailwind/NativeWind

This project uses NativeWind to enable Tailwind-like classes in React Native. Tailwind's `@tailwind` directives are used in `src/styles/global.css` and processed by the Metro bundler via NativeWind setup.

If you see editor warnings like "Unknown at rule @tailwind", these are lint/VSCode warnings (PostCSS/Tailwind directives aren't standard CSS). They don't always indicate a build issue. See Troubleshooting below.

## TypeScript and editor configuration

This project uses TypeScript. Key config files:

- `tsconfig.json` - TypeScript configuration
- `global.d.ts` and `nativewind-env.d.ts` - global types for styling and NativeWind

## NativeWind / Tailwind linter warnings

If you see editor warnings like "Unknown at rule @tailwind":

- Ensure you have `postcss.config.js` at the project root with Tailwind and Autoprefixer configured.
- Add workspace settings or install VS Code extensions that recognize Tailwind directives for CSS.
- These warnings often don't block builds; run the app to confirm.

## Testing (suggested)

Add unit tests for small utilities (`src/utils`) and component snapshot tests with `@testing-library/react-native`.

## Troubleshooting

- Build errors: run `npx expo start -c` to clear metro/cache.
- Type errors: restart TS server (`Ctrl+Shift+P` -> "TypeScript: Restart TS server").

## Contributing

- Fork, create a feature branch, run tests, open a PR with a clear description.

## License

This project does not include a license file in the repository. Add a LICENSE file if you want to make the project open-source and choose a license.
