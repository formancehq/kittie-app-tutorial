# Step 1: Scaffolding the app

Kittie is a webapp built using React and Typescript on the frontend, and Node with Express and Typescript on the backend. In addition, Kittie makes use of several third-party services to ease our way: Stripe for payments processing, Stytch for authentication, and of course Formance Ledger for tracking money flows.

Let's begin by getting a bare-bones app working. At the end of this step, we will have:

* An Express-based backend with a single stub API endpoint that returns a simple text string
* A React frontend that hits that stub API endpoint
* All the third-party services we'll be using configured and ready to integrate.

## The Scaffolding

We've provided you with a very basic full-stack app template, all in the `src` folder. Let's look at the folders and files, to understand the various parts of our app:

- `.env.example`: is an example configuration file that we'll use to feed in configuration options, credentials, other secrets we need to work with the various third-party services we'll employ. We'll need to edit this file shortly.
- `package.json`: list of dependencies for this project. There is no need to edit this file.
- `yarn.lock`: auto-generated from `package.json`. You must not edit this file.
- `tsconfig.json`: configuration for the Typescript compiler. There is no need to edit this file.
- `src/front-app/`: source code for our React front end.
	- `src/front-app/pages`: a folder for each page in our app.
		- `src/front-app/pages/Home.tsx`: the landing page for our app, currently the only page.
		- `src/front-app/pages/components`: custom React components we'll use to build up the pages in our app.
			- `src/front-app/pages/Button.tsx`: a custom button component.
			- `src/front-app/pages/Navbar.tsx`: the app's navigation bar.
			- `src/front-app/pages/HelloWorld.tsx`: a placeholder component that loads an arbitrary string of text from the backend, just to show us that things are working.
	- `src/front-app/lib`: a place to store utility code.
		- `src/front-app/lib/api.ts`: a thin wrapper around [axios](https://axios-http.com/) for calling out to API endpoints in our backend.
	- `src/front-app/index.html`: The HTML container for our app. No need to edit this.
	- `src/front-app/index.tsx`: The React component for our app; it coordinates the pages to make sure everything flows together.
	- `src/front-app/global.css`: A CSS file that resets all styling to the default. We won't be editing this file.
- `src/server-app/`: source code for our Express back end.
	- `src/server-app/api`: the home for each of our API endpoints.
		- `src/server-app/api/main.ts`: this file registers all of our endpoints with Express. This is the main entrypoint for our backend code.
		- `src/server-app/api/helloworld.ts`: a temporary API endpoint that returns an arbitrary string of text, just to show us that things are working.
	- `src/server-app/db/`: connectors to a persistent store. To start with, we're just going to use `sqlite3` to keep things simple. The files here Won't require any editing.
	- `src/server-app/ledger/`: connectors to Formance Ledger.
	  - `src/server-app/ledger/ledger.ts`: A bit of glue code to pull in the Formance Ledger SDK, and make calling our custom Numscripts straightforward.
		- `src/server-app/ledger/scripts/`: As we start adding money flows to our app, we'll need to describe those flows using Numscript. Each flow will get a new Numscript file in this folder.
	- `src/server-app/queries/`: Each money flow described in Numscript will need bridging into our app; this is where those bridges will live.
	- `src/server-app/service/`: This is where we'll write code to integrate with third-party services like [Stripe](https://stripe.com/) and [Stytch](https://stytch.com/).
	- `src/server-app/types/`: As we integrate Formance Ledger, this is where we'll create some custom datatypes to bridge Ledger with our Typescript backend.

## Configuring and Test Run

Let's make sure everything is in place, and ready to start hacking on by running this very barebones app.

### .env

First, copy the example environment file to one ready to use:

```bash
cp .env.example .env
```

No need to edit it yet, the defaults will work fine.

### Install dependencies

Everything here is running with Node. [Install Node](https://nodejs.dev/en/learn/how-to-install-nodejs/) if you haven't already. We're also using yarn to manage our dependencies and to execute our runners. If you don't have yarn installed, that's straightforward:

```bash
npm install -g yarn
```

Then, use yarn to install the dependencies for this app; it might take several minutes to complete.

```bash
yarn install
```

### Run backend

Now, let's start up the backend:

```bash
yarn run backend
```

If all goes well, you'll see this message after a moment:

```
app listening on 3022
```

#### Troubleshooting

You might not see that message! You might get an error.

If you see `error Command "ts-node-dev" not found.`, it's because you forgot to install the dependencies—don't forget to to run `yarn install` first! You only need to do this once.

### Run frontend

Open a second terminal, and navigate to the kittie repository. Then start the frontend

```bash
yarn run frontend
```

If all goes well, you'll see this message after a moment:

```
Server running at http://localhost:1234
```

Now visit [http://localhost:1234](http://localhost:1234). You should see a screen that reads

```
Hello, world!
```

If you do, congratulations, everything is set up and talking to each other.


### Troubleshooting

If you see something other than "Hello, world!", for example "Loading…", this means that the front end isn't able to talk to the backend. Maybe the backend isn't running. Perhaps you didn't open a second terminal, instead quitting the backend to start the frontend? You need both processes running at the same time in different terminals!

## Setting up Third-party Services

Now that our scaffolded app is running properly, let's set up the third party services we are going to use:

* **[Stripe](https://stripe.com/)** for payments processing.
* **[Stytch](https://stytch.com)** for authentication.

### Stripe

If you don't have an account with Stripe, you should [create one here](https://dashboard.stripe.com/register). Don't worry about connecting bank account information, for now we are only going to be using Stripe in test mode.

Log into your account and [visit the API keys page](https://dashboard.stripe.com/apikeys).

⚠️ Look to the top right of the page, be be **absolutely certain** that test mode is enabled before moving forward.

![Make sure that test mode is on!](readme-img/stripe-test-mode.png)

We need the publishable key for this app. The publishable key is an API key that is safe to share, and hence suitable for use in the front-end. The secret key, on the other hand, should never be shared, and is suitable for more secure operations in the back-end.

![Stripe publishable and secret keys](readme-img/stripe-api-keys.png)

Copy the publishable key and secret key into your `.env` file:

```
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY"
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY"
```

⚠️ If your keys **do not** begin with `pk_test` or `sk_test`, you are using production keys! This is a mistake, and if you continue, real money will change hands (and you will pay fees for that). Make sure you have test mode enabled, as per the instructions above!

Finally, we need to set up a webhook. Stripe offers the option of emitting events (such as new transactions) to our backend via webhook—and we will want to receive notifications of money entering or leaving our systems, so let's set one up.

Normally, Stripe needs to see a public API endpoint it can reach, but for development purposes, Stripe has a command line tool that allows you to receive webhooks on your local development machine. [Visit this link](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local) to set up a local development webhook. You'll need to follow the directions on that page to download and install the Stripe CLI tool. Otherwise there is nothing else to do for this step, for now.

ℹ️ There is no need to run the Stripe CLI just yet. We'll come to that in a later step.


### Stytch

Next, let's set up our authentication service provider, [Stytch](https://stytch.com/). Stytch is a service that will allow us to authenticate users with magic links or SMS codes, rather than passwords. This makes it easier for us to manage our user accounts securely, since it relieves us of the burden of managing a secure password store.

If you don't have a Stytch account, you can [make one here](https://stytch.com/login).

Stytch organizes the apps you are securing by _project_, and they automatically create one for you when you first log in. We need the project ID, and its corresponding secret key.

Visit [the API keys dashboard](https://stytch.com/dashboard/api-keys).

⚠️ Just like with Stripe, make sure you're in the test environment!

![Make sure that test mode is on!](readme-img/stytch-test-mode.png)

You'll find the project ID and the secret key both on the same page:

![Stytch project ID and secret keys](readme-img/stytch-api-keys.png)

Copy the project ID and secret key into the `.env` file:

```
STYTCH_PROJECT_ID="YOUR_STYTCH_PROJECT_ID"
STYTCH_SECRET="YOUR_STYTCH_SECRET KEY"
```

⚠️ If your keys **do not** begin with `project-test` or `secret-test`, you are using production keys! This is a mistake. Make sure you have test mode enabled, as per the instructions above!

That's all we need for Stytch for now. Let's move on.

### Formance Ledger

The last puzzle piece is the ledger itself. We don't need an account with Formance to get started—we'll begin by running the ledger locally.

First, if you haven't yet, you'll need to [install Formance Ledger](https://docs.formance.com/oss/ledger/get-started/installation) onto your local machine. Once it's installed, you can verify that everything is working like this:

```bash
numary version
```

If the ledger CLI is installed correctly, you will see something like this:

```
Version: 1.7.3 
Date: 2022-08-12T13:01:28Z 
Commit: 6a417bc 
```

By default, Ledger runs on port 3068. For now, there shouldn't be any changes we need to make to `.env` to support connecting to Ledger.

## On To Step 2

And that's it for step 1! In this step, we got all the tooling required up and running, and verified that all the parts are operating as expected.

To move on to step 2, all you need to do is

```bash
git checkout step-2
```

and reload this `README.md`.

In step 2, we'll start adding some functionality to our new app: We'll handle user creation and authentication, and connect to Ledger to display their wallet balance to them!