package middleware

import (
	"net/http"
	"sync"
	"time"
)

type FixedRateLimiter struct {
	sync.RWMutex
	clients  map[string]int
	Enabled  bool
	Limit    int
	Duration time.Duration
}

func (rateLimiter *FixedRateLimiter) Allow(ip string) (bool, time.Duration) {
	if rateLimiter.clients == nil {
		rateLimiter.clients = make(map[string]int)
	}

	rateLimiter.RLock()
	count, exists := rateLimiter.clients[ip]
	rateLimiter.RUnlock()

	if !exists || count < rateLimiter.Limit {
		rateLimiter.Lock()
		if !exists {
			go rateLimiter.Reset(ip)
		}

		rateLimiter.clients[ip]++
		rateLimiter.Unlock()

		return true, 0
	}

	return false, rateLimiter.Duration
}

func (rateLimiter *FixedRateLimiter) Reset(ip string) {
	time.Sleep(rateLimiter.Duration)

	rateLimiter.Lock()
	defer rateLimiter.Unlock()

	delete(rateLimiter.clients, ip)
}

func RateLimiter(rateLimiter *FixedRateLimiter) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
			if rateLimiter.Enabled {
				if allow, retry := rateLimiter.Allow(request.RemoteAddr); !allow {
					response.Header().Set("Retry-After", retry.String())
					response.WriteHeader(http.StatusTooManyRequests)
					response.Write([]byte("Rate limit exceeded"))
					return
				}
			}
			next.ServeHTTP(response, request)
		})
	}
}
