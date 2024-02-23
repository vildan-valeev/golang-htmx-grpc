package main

import (
	"context"
	"fmt"
	"golang-htmx-grpc/generated"
	"google.golang.org/grpc"
	"log"
	"math/rand"
	"net"
)

type server struct {
	generated.UnimplementedAPIServiceServer
}

func (s *server) AddItem(ctx context.Context, in *generated.BodyRequest) (*generated.BodyResponse, error) {
	log.Printf("Received: %v", in.GetBody())
	return &generated.BodyResponse{Body: fmt.Sprintf("<li class=\"item\">ID %d</li>", rand.Int())}, nil
}

func (s *server) ReadItem(ctx context.Context, in *generated.BodyRequest) (*generated.BodyResponse, error) {
	log.Printf("Received: %v", in.GetBody())
	return &generated.BodyResponse{Body: fmt.Sprintf("<li class=\"item\">Title: Default. ID: %d</li>", rand.Int())}, nil
}

//func (s *server) Index(ctx context.Context, in *generated.BodyRequest) (*generated.BodyResponse, error) {
//	log.Printf("Received: %v", in.GetBody())
//	return &generated.BodyResponse{Body: `<li class="list-group-item bg-primary text-white">Title2</li>`}, nil
//}

func main() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 9090))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	generated.RegisterAPIServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
