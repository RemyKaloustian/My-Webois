# Load files API

## __`POST`__ /api/accidents/load/csv/gov

Load a CSV file from the Government.
Your CSV file must include either `latitude` and `longitude` columns or `numero`, `libellevoie` and `codeinsee` _(i.e. postal code)_ columns or all of them.

```json
Input:
{
    "filePath": "http://site.com/file/to/your/file.csv"
}
```
