

翻转切片：

```go
func reverseSlice[T any](s []T) []T {
    for i,j :=0, len(s)-1;i<j;i++,j-- {
        s[i], s[j] = s[j], s[i]
    }
    return s
}
```