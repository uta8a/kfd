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
	"github.com/labstack/gommon/log"
	"github.com/srinathgs/mysqlstore"
	"github.com/ziflex/lecho/v3"
)

var (
	db     *sqlx.DB
	store  *mysqlstore.MySQLStore
	config mysql.Config
)

type HealthCheckResponse struct {
	Message string `json:"message,omitempty"`
	Detail  string `json:"detail,omitempty"`
}

type Player struct {
	Username string `json:"username"`
	Score    string `json:"score"`
}

type PlayersResponse struct {
	Players []Player `json:"players"`
}

func main() {
	e := echo.New()
	e.Logger = lecho.New(os.Stdout)

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		e.Logger.Fatalj(log.JSON{
			"message": "get TimeZone info",
			"detail":  err.Error(),
		})
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
		e.Logger.Fatalj(log.JSON{
			"message": "get mysql connection",
			"detail":  err.Error(),
		})
	}
	db = _db

	_store, err := mysqlstore.NewMySQLStoreFromConnection(db.DB, "sessions", "/", 60*60*24*14, []byte("secret-token"))
	if err != nil {
		e.Logger.Fatalj(log.JSON{
			"message": "create session store",
			"detail":  err.Error(),
		})
	}
	store = _store

	e.Use(session.Middleware(store))

	// Path
	e.GET("/.healthcheck", getHealthCheck)
	e.GET("/.healthcheck/deep", getDeepHealthCheck)
	// e.GET("/players", getPlayers)
	e.Start(":3000")
}

func getHealthCheck(c echo.Context) error {
	response := HealthCheckResponse{
		Message: "server is up",
	}
	return c.JSON(http.StatusOK, response)
}

func getDeepHealthCheck(c echo.Context) error {
	if err := db.Ping(); err != nil {
		c.Echo().Logger.Errorj(log.JSON{
			"message": "get deep healthcheck",
			"detail":  err.Error(),
		})
		response := HealthCheckResponse{
			Message: "failed to get connection to db",
			Detail:  err.Error(),
		}
		return c.JSON(http.StatusServiceUnavailable, response)
	}
	response := HealthCheckResponse{
		Message: "success to connect db",
	}
	return c.JSON(http.StatusOK, response)
}

// func getPlayers(c echo.Context) error {
//   var players []Player
//   players = make([]Player, 0)
//   rows, err := db.Query("SELECT username, score FROM users WHERE role = 'player'")
//   if err != nil {
//     c.Echo().Logger.Errorf("")
//     return c.JSON()
//   }
//   response := PlayersResponse {
//     Players: ,
//   }
//   return c.JSON(http.StatusOK, response)
// }
