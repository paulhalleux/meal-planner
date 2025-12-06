generate_query_db:
	gorm gen -i .\internal\model\ -o ./internal/generated/query_db

run:
	go run ./cmd/server/main.go

swagger:
	swag init -g ./cmd/server/main.go -o ./docs --parseInternal --parseDependency  --outputTypes go,json