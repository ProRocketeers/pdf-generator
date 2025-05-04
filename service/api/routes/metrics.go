package routes

import (
	"expvar"
	"net/http"
	"pdf-generator/infrastracture"
)

type BySizeStat struct {
	Size    uint32 `json:"Size"`
	Mallocs uint64 `json:"Mallocs"`
	Frees   uint64 `json:"Frees"`
}

type Memstats struct {
	Alloc         uint64       `json:"Alloc"`
	TotalAlloc    uint64       `json:"TotalAlloc"`
	Sys           uint64       `json:"Sys"`
	Lookups       uint64       `json:"Lookups"`
	Mallocs       uint64       `json:"Mallocs"`
	Frees         uint64       `json:"Frees"`
	HeapAlloc     uint64       `json:"HeapAlloc"`
	HeapSys       uint64       `json:"HeapSys"`
	HeapIdle      uint64       `json:"HeapIdle"`
	HeapInuse     uint64       `json:"HeapInuse"`
	HeapReleased  uint64       `json:"HeapReleased"`
	HeapObjects   uint64       `json:"HeapObjects"`
	StackInuse    uint64       `json:"StackInuse"`
	StackSys      uint64       `json:"StackSys"`
	MSpanInuse    uint64       `json:"MSpanInuse"`
	MSpanSys      uint64       `json:"MSpanSys"`
	MCacheInuse   uint64       `json:"MCacheInuse"`
	MCacheSys     uint64       `json:"MCacheSys"`
	BuckHashSys   uint64       `json:"BuckHashSys"`
	GCSys         uint64       `json:"GCSys"`
	OtherSys      uint64       `json:"OtherSys"`
	NextGC        uint64       `json:"NextGC"`
	LastGC        uint64       `json:"LastGC"`
	PauseTotalNs  uint64       `json:"PauseTotalNs"`
	PauseNs       []uint64     `json:"PauseNs"`
	PauseEnd      []uint64     `json:"PauseEnd"`
	NumGC         uint32       `json:"NumGC"`
	NumForcedGC   uint32       `json:"NumForcedGC"`
	GCCPUFraction float64      `json:"GCCPUFraction"`
	EnableGC      bool         `json:"EnableGC"`
	DebugGC       bool         `json:"DebugGC"`
	BySize        []BySizeStat `json:"BySize"`
}

type MetricsResponse struct {
	Cmdline  []string `json:"cmdline"`
	Memstats Memstats `json:"memstats"`
	Version  string   `json:"version"`
}

// @Summary		Metrics
// @Description	Get service metrics
// @Tags			System
// @Success		200	{object}	MetricsResponse	"Service metrics"
// @Failure		500	{object}	nil				"Internal server error"
// @Router			/metrics [get]
func GetMetrics(config *infrastracture.Config) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		expvar.NewString("version").Set(config.Version)

		expvar.Handler().ServeHTTP(response, request)
	}
}
