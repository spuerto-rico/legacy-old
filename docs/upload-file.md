# File Upload API Documentation

## API Endpoint
`POST` - `api/v1/upload-file`

## Form Data
| Property Name | Required | Type             | Description               |
|---------------|----------|------------------|---------------------------|
| file          | Yes      | File (Object)    | is required               |

## Headers
| Property Name | Required | Type                  | Description         |
|---------------|----------|-----------------------|---------------------|
| Authorization | Yes      | String (Bearer Token) |                     |

## Responses

### 200 Success
Saved
```json5
{
  "message": "File saved",
  "error": false,
  "data": {
    "url": '' // path of the file
  },
  "result": ""
}
```
Not saved
```json5
{
  "message": "File not saved",
  "error": true,
  "data": {
    "url": ''
  },
  "result": ""
}
```

### 404 Not Found
```json5
{
  "message": "File not found",
  "error": true,
  "data": null,
  "result": ""
}
```
