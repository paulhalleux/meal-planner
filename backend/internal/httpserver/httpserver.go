package httpserver

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "backend/docs"
)

type Handler interface {
	Register(router gin.IRoutes)
}

type HttpServer struct {
	address string
	port    string
	gin     *gin.Engine
	server  *http.Server
	api     *gin.RouterGroup
}

func NewHttpServer(address, port string) HttpServer {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	r.Use(gin.Recovery())
	if gin.Mode() == gin.DebugMode {
		r.Use(gin.Logger())
	}

	server := &http.Server{
		Addr:    joinHostPort(address, port),
		Handler: r,
	}

	api := r.Group("/api")
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return HttpServer{
		address: address,
		port:    port,
		gin:     r,
		server:  server,
		api:     api,
	}
}

func (h *HttpServer) Start() {
	log.Printf("[http] HTTP server listening on %s", h.server.Addr)

	if err := h.server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		panic(fmt.Sprintf("[http] failed to start HTTP server: %v", err))
	}
}

func (h *HttpServer) Stop() error {
	return h.server.Shutdown(context.Background())
}

func (h *HttpServer) RegisterHandler(handler Handler) {
	handler.Register(h.gin)
}

func (h *HttpServer) RegisterApiHandler(handler Handler) {
	handler.Register(h.api)
}

func joinHostPort(host, port string) string {
	if host == "" {
		return fmt.Sprintf(":%s", port)
	}
	return fmt.Sprintf("%s:%s", host, port)
}
