
# template_html_to_pdf [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


A NPM package used to create PDF version of html template files


## Installation

Install `template_html_to_pdf with npm`

```bash
  npm install --save template_html_to_pdf
```
    
## Usage/Examples

```javascript
import { loadAndGenerateFile } from "template_html_to_pdf";
import { fileURLToPath } from "url";
import * as path from "path";

loadAndGenerateFile(path.dirname(fileURLToPath(import.meta.url)));

```
```
OUTPUT
Load success ✅
Compile success ✅
[ { status: true, message: 'PDF generated' } ]
```

## API Reference

#### Get item

```http
   loadAndGenerateFile(source,destination,metadata)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `source`      | `string` | **Optional**. source directory relative to caller function |
| `destination`      | `string` | **Optional**. destination directory relative to caller function for generated files|
| `metadata`      | `object` | **Optional**. extra data for template compilation |

#### loadAndGenerateFile()
Returns none;


## Authors
[@Nabeelaron](https://github.com/Nabeelaron/html_to_pdf)
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

