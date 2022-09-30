# Election Compass API

The Election Compass API exposes the answers provided by parties and candidates
for the 2022 swedish elections through a GraphQl API.

This Election Compass API was used during the build process when generate the
the static pages for [SVT's Valkompass](https://valkompass.svt.se/2022).

## Development

```
  yarn install
  yarn dev
```

### Playground

A GraphQL playground is availabe by default and can be accessed locally by
browsing [http://localhost:8443/graphql](http://localhost:8443/graphql)

### Database

The datebase that is required for the election compass to work is in the form
of static json files. These file should be downloaded from
[valkompass.svt.se](https://valkompass.svt.se/2022/json/archive.a7f10d4b27333b7df909a08623526c05.tar.gz)
during the yarn installation process or by using `yarn data:download` command.
Optionally the archived data can be download manualy and the content extracted
to a folder named `data` in the project root folder.

## License

Copyright 2022 Sveriges Television AB.

Election Compass API is released under the [MIT License](LICENSE).

## Maintanance

This code base should for now be seen as UNMAINTAINED, and provided as-is. However, we might still consider PR:s and issues if found.
