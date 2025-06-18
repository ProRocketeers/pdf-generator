package infrastracture

type Config struct {
	Version     string
	Port        string
	Host        string
	BasePath    string
	Timeout     int
	CorsOrigins []string
	Dev         bool
}
