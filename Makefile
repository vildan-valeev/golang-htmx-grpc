#
#.PHONY: js-proto
#js-proto:
#	@protoc -I=proto proto/*.proto --js_out=import_style=commonjs:./static/js  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./static/js
#
#
#.PHONY: go-proto
#go-proto:
#	@protoc -I=proto --go_out=./generated --go_opt=paths=source_relative --go-grpc_out=./generated --go-grpc_opt=paths=source_relative proto/*.proto

.PHONY: js-proto
js-proto:
	@protoc -I=. api.proto \
	  --js_out=import_style=commonjs:. \
	  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

.PHONY: go-proto
go-proto:
	@protoc -I=. --go_out=./generated --go_opt=paths=source_relative --go-grpc_out=./generated --go-grpc_opt=paths=source_relative api.proto
