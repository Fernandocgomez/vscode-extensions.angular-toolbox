Programmatic Language Features add rich programming language support such as Hovers, Go to Definition, diagnostic errors, IntelliSense and CodeLens. These language features are exposed through the vscode.languages.\* API. An extension can either use these API directly, or write a Language Server and adapt it to VS Code using the VS Code Language Server library.

Although we provide a listing of language features and their intended usage, nothing prevents you from using these API creatively. For example, CodeLens and Hovers are a great way to present additional information inline, while diagnostic errors can be used to highlight spelling or code style errors.

Extension Ideas

- Add hovers that show sample usage of an API.
- Report spelling or linter errors in source code using diagnostics.
- Register a new code formatter for HTML.
- Provide rich, context-aware IntelliSense.
- Add folding, breadcrumbs and outline support for a language.
