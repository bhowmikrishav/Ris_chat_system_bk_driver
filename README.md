# Chat system backend driver

## MessageObject

#### Components
- `time`    : `<time in milli-seconds>`
- `lines`   : `<Array<Buffer>>`

#### Buffer Pattern
Request{
    h :`{send_at_ms:<time in milli-seconds>, buffer_map:<Arrar<Number<Unsigned Integer>>>}`,
    b :`line[0]buffer`+`line[1]buffer`+`line[2]buffer`+...
}

```
    {
        
    }
```
