package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/srinathgs/mysqlstore"
	"github.com/ziflex/lecho/v3"
)

var (
	db     *sqlx.DB
	store  *mysqlstore.MySQLStore
	config mysql.Config
)

type HealthCheckResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message,omitempty"`
	Detail  string `json:"detail,omitempty"`
}

func main() {
	e := echo.New()
	e.Logger = lecho.New(os.Stdout)

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		e.Logger.Fatalf("[get TimeZone info] %v", err)
	}

	config = mysql.Config{
		DBName:               os.Getenv("MYSQL_DATABASE"),
		User:                 os.Getenv("MYSQL_USER"),
		Passwd:               os.Getenv("MYSQL_PASSWORD"),
		Addr:                 fmt.Sprintf("%s:%s", os.Getenv("MYSQL_HOST"), os.Getenv("MYSQL_PORT")),
		Net:                  "tcp",
		ParseTime:            true,
		Collation:            "utf8mb4_unicode_ci",
		Loc:                  jst,
		AllowNativePasswords: true,
	}
	_db, err := sqlx.Connect("mysql", config.FormatDSN())
	if err != nil {
		e.Logger.Fatalf("[get mysql connection] %v", err)
	}
	db = _db

	_store, err := mysqlstore.NewMySQLStoreFromConnection(db.DB, "sessions", "/", 60*60*24*14, []byte("secret-token"))
	if err != nil {
		e.Logger.Fatalf("[create session store] %v", err)
	}
	store = _store

	e.Use(session.Middleware(store))

	// Path
	e.GET("/.healthcheck", getHealthCheck)
	e.GET("/.healthcheck/deep", getDeepHealthCheck)
	e.Start(":3000")
}

func getHealthCheck(c echo.Context) error {
	response := HealthCheckResponse{
		Status: http.StatusOK,
	}
	return c.JSON(http.StatusOK, response)
}

func getDeepHealthCheck(c echo.Context) error {
	_, err := sqlx.Connect("mysql", config.FormatDSN())
	if err != nil {
		c.Echo().Logger.Errorf("[get deep healthcheck] %v", err)
		response := HealthCheckResponse{
			Status:  http.StatusServiceUnavailable,
			Message: "failed to get connection to db",
			Detail:  err.Error(),
		}
		return c.JSON(http.StatusServiceUnavailable, response)
	}
	response := HealthCheckResponse{
		Status:  http.StatusOK,
		Message: "success to connect db",
	}
	return c.JSON(http.StatusOK, response)
}
