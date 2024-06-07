# walk-user-app

Full stack [Next.js](https://github.com/vercel/next.js) app focused on handling the user interactions for "Walk" websites.

## Getting Started

Ensure you have the correct [Node.js](https://github.com/nodejs/node) version installed. The easiest way to do this is to install [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) and then run `nvm install`, this will get the correct version from the `.nvmrc` file that lives in the root of this project. You can also just run `nvm use` if you already have that particular node version installed.

1. Run `npm i`
2. Copy `.env.local.example` and rename the new file to `.env.local`

_Note: If you get an npm `Unsupported engine` error or similar when running `npm i` see the paragraph above re: Using the correct Node.js version._

3. This app needs the [walk-content-service](https://github.com/al-tron/walk-content-service) to be running to work. You can either spin up a local instance as described in the `README.md` of that repo, or point this app to the live walk-content-service by commenting out the `CONTENT_SERVICE_API` variable that appears under `# Local Content` in your `.env.local` file, and then uncommenting the same variable under `# Production Content` directly below.

4. Run `npm run dev`

And with a bit of luck you should now be up and running!

### OS Maps & Contact form

If you want the map to display and/or the contact form to actually send emails you'll need to add the API credentials to one or more of the following variables in your `.env.local` file: `OS_API_KEY`, `OS_API_SECRET`, `SENDGRID_API_KEY`.

### User Services

_Prerequisite: Have Docker Desktop installed so you can run docker commands._

The user database needs to be running for any logged in/user account functionality to work, this can be done in a similar manor to above, whereby you spin up a local postgres database in docker desktop and set the connection string in the `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` environment variables.

You'll also need to add some credentials to the following variables in your `.env.local` file: `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET_ID`.

#### First Time

1. `docker run --name walk-user-app-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres` - spin up a PostgreSQL container. The command here matches the connection strings named as `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` in the `.env.local.example` file. This command should also pull the latest PostgreSQL docker image, if you don't already have it.
2. Run `npm run prisma:migrate` to migrate the schema to the PostgreSQL instance you've just set up, and to generate `PrismaClient`.
3. If everything has run successfully you should be able to see the database structure by running `npm run prisma:studio`.

#### Subsequent Times

You won't have to follow the above process each time, once the container has been set up originally you may just need to start it up again.

You can do this via the Docker Desktop UI and clicking the play button next to the `walk-user-app-postgres` container, or by running the following command in the terminal: `docker start walk-user-app-postgres`.

## Terminology

### Baggable

A "baggable" is something that a user can "bag", or tick off as having ventured to, the terminology comes from the popular outdoor activity of hill/peak/munro bagging. A baggable is typically a hill or mountain but could also be a trig point, a stone circle or anything else really, we use the term baggable(s) throughout this codebase to represent these things.

They are usually grouped and the challenge is to bag them all, the most famous example probably being the Scottish Munros, or the Wainwrights of the Lake District.

Peace and love x
