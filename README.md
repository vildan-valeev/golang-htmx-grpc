# Simple Project for testing [HTMX](https://htmx.org/docs/) with [gRPC-Web](https://github.com/grpc/grpc-web/tree/master)
---
Sending HTML code parts from the backend as a string and inserting them into the DOM using htmx.

1. https://htmx.org/docs/#extensions
2. https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld#compile-the-client-javascript-code
3. 

---
### Start
1. Generate js from proto file (optional, if doesn't exist `api_pb.js`, `api_pb_web.js`)
```sh
make js-proto
```
2. Generate go package from proto file (optional, if doesn't exist `api.pb.go`, `api_grpc.pb.go`)
```sh
make go-proto
```
3. Compile the client side JavaScript (optional, if doesn't exist `main.js`)
```sh
browserify client.js -o main.js
```
4. Run Proxy Server
```sh
docker compose up --build --remove-orphans
```
5. Start Backend
```sh
go mod tidy
go build -o main main.go
./main
```
6. Open `index.html` in Browser
