# Private Notes

Monorepo for a notes application

## Packages

- [private-notes-backend](apps/backend/) Backend services
- [private-notes-cli](apps/cli/) Node.js client
- [private-notes-infra](apps/infra/) Permanent infra
- [private-notes-web](apps/web/) Web client
- [private-notes-api](packages/api/) Api client and definition
- [private-notes-persist](packages/persist/) Data persisting adapters

## Usage

### Run the web client

1. Deploy the infra
   ```
   pnpm infra deploy:dev
   ```
1. Build & start the backend services
   ```
   pnpm backend dev
   ```
1. Start the web client
   ```
   pnpm web dev
   ```
