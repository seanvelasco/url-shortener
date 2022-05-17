# URL shortener using Cloudflare Workers KV

## Usage

### Using query params

Append the target URL to be shortened to the `shorten` parameter

```https://sean.red/?shorten=https://www.youtube.com/watch?v=Xw5l-hCpVdw```

The response will return the shortened URL as plain text

```https://sean.red/buoa1l```

### Using POST or PUT request

The following JSON bodies can be used to shorten URLs:

To shorten a single URL:

```json
{
  "url": "https://www.youtube.com/watch?v=X-XZziAc4Qc"
}
```
To shorted multiple URLs:

```json
{
  "urls": [
    "https://www.youtube.com/watch?v=X-XZziAc4Qc",
    "https://www.youtube.com/watch?v=hl9sSQhlqCU"
  ]
}
```
or simply as an array
```json
[
    "https://www.youtube.com/watch?v=X-XZziAc4Qc",
    "https://www.youtube.com/watch?v=hl9sSQhlqCU"
]
```
The response will a JSON array of objects containing the origin URL and the shortened URL

 ```json
[
    {
        "original": "https://www.youtube.com/watch?v=X-XZziAc4Qc",
        "shortened": "https://sean.red/yjvil5"
    },
    {
        "original": "https://www.youtube.com/watch?v=hl9sSQhlqCU",
        "shortened": "https://sean.red/s01nqu"
    }
]
```

## Notes

Feel free to copy and make it your own!

## Author

* [Sean Velasco](https://seanvelasco.com)