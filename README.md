# my-datepicker

A spike to get a datePicker component, who could fit into a multi-brand design system. The goals are to:
- Compose a datePicker by smaller components with [React]
- Document everything into a deployed [Storybook].
- Ensure components are themeable for multi-brand purposes. To handle this, style tokens are managed by [Style Dictionary].

Results are built for two fake brands: `bourgeois` and `circuitous`. You can see the outcomes on:
- [https://my-datepicker-bourgeois.danifornells.now.sh](https://my-datepicker-bourgeois.danifornells.now.sh)
- [https://my-datepicker-circuitous.danifornells.now.sh](https://my-datepicker-circuitous.danifornells.now.sh)

Hope you like it, feedback is much appreciated.

### Getting started

Install the npm dependencies by `npm install`.

There are some tasks could let you run the code locally:
- `npm run start:bourgeois` will build and start the artifacts for the `bourgeois` brand
- `npm run start:circuitous` will build and start the artifacts for the `circuitous` brand
- `npm run build` will build static artifacts for both brands into `build/`
- `npm run test` to test the code
- `npm run lint` to lint JS/JSX & SCSS files
- `npm run deploy` to deploy to [Now]

[React]: https://reactjs.org/
[Storybook]: https://storybook.js.org/
[Style Dictionary]: https://amzn.github.io/style-dictionary
[Now]: https://zeit.co/