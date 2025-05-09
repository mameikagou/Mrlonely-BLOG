package main

import (
	"fmt"
	"sync"
)

// go run -race 1.go
func main() {
	var counter Counter // 0值声明
	// counter := Counter{
	// 	CounterType: 1,
	// 	Name:        "test",
	// }
	var wg sync.WaitGroup
	wg.Add(10)

	for range 10 {
		go func() {
			defer wg.Done()
			for range 10000 {
				// mu.Lock()
				// count++ // 这里并不是原子操作，所以有并发问题，应该加锁
				counter.Increment()
				// mu.Unlock()
			}
		}()
	}

	wg.Wait()
	fmt.Println(counter.GetCount())
}

type Counter struct {
	CounterType int
	Name        string
	mu          sync.Mutex
	count       int
}

func (c *Counter) Increment() {
	c.mu.Lock()
	c.count++
	c.mu.Unlock()
}

func (c *Counter) GetCount() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}
