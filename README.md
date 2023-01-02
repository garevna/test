# live.pineapple.net.au

###### Landing pages for pineapple.net.au

## Configure deployment (push to remote)

#### Set package.json variables

`"remote": "test"` for gh-pages

This will set `process.env.BASE_URL` to `/test/`

Another value means push to prod (`process.env.BASE_URL` will be `/`)

#### Deploy to gh-pages (push to remote)

To deploy on gh-pages you should run the script **`test.sh`**

You can use for this next command:

```
yarn deploy-test
```

#### Localhost config to test service worker

Type `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in the address bar.

Then go to `Insecure origins treated as secure` and add the origin which you need to treat as secure.

For example, `http://192.168.0.103:8080`

Then set `Enabled` for this origin.

Now you can test your service worker locally.
_____________________________________________________________

**Important**: You should remove `dist` folder before push on prod
_____________________________________________________________

[**run**](https://garevna.github.io/live.pineapple.net.au)

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your unit tests
```
npm run test:unit
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
