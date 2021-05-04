# sanity-plugin-string-limiter

A custom input component to show max length validation in a UI for editors

## Installation

```
sanity install string-limiter
```

## Usage

After it's installed, you can use the custom input to replace any input of type `string`. It requires a validation rule to set the max limit for the input.

```javascript
export default {
  name: 'aDocument',
  title: 'A Document',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'limitedString', // Uses the custom input
      validation: Rule => Rule.max(50) // This will set the max range
    }
  ]
}
```

## License

MIT © Bryan Robinson
See LICENSE