package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// .envファイルから環境変数を読み込む
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// 環境変数から接続情報を取得
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_HOST") // または環境変数から取得
	dbPort := os.Getenv("POSTGRES_PORT") // または環境変数から取得

	// DSNを構築
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Tokyo", dbHost, dbUser, dbPassword, dbName, dbPort)

	// GORMでデータベースに接続
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// データベースにテーブルを作成
	db.AutoMigrate(&Task{})

	// Ginエンジンのインスタンスを作成
	r := gin.Default()

	// // ルートURL ("/") に対するGETリクエストをハンドル
	// r.GET("/", func(c *gin.Context) {
	// 	// JSONレスポンスを返す
	// 	c.JSON(200, gin.H{
	// 		"message": "Hello World",
	// 	})
	// })

	// CORS設定
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	// タスクを取得するエンドポイント
	r.GET("/tasks", func(c *gin.Context) {
		var tasks []Task
		db.Find(&tasks)
		c.JSON(http.StatusOK, tasks)
	})

	r.GET("/tasks/:id", func(c *gin.Context) {
		var task Task
		id := c.Param("id")
		uuid, err := uuid.Parse(id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID"})
			return
		}

		if err := db.First(&task, "id = ?", uuid).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		// if err := db.First(&task, id).Error; err != nil {
		// 	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		// 	return
		// }
		c.JSON(http.StatusOK, task)
	})

	// 新しいタスクを作成するエンドポイント
	r.POST("/tasks", func(c *gin.Context) {
		var task Task
		if err := c.ShouldBindJSON(&task); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&task)
		c.JSON(http.StatusOK, task)
	})

	// タスクを更新するエンドポイント
	r.PUT("/tasks/:id", func(c *gin.Context) {
		var task Task
		id := c.Param("id")

		uuid, err := uuid.Parse(id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID"})
			return
		}

		if err := db.First(&task, "id = ?", uuid).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		// if err := db.First(&task, id).Error; err != nil {
		// 	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		// 	return
		// }

		if err := c.ShouldBindJSON(&task); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.Save(&task)
		c.JSON(http.StatusOK, task)
	})

	// タスクを削除するエンドポイント
	r.DELETE("/tasks/:id", func(c *gin.Context) {
		var task Task
		id := c.Param("id")

		uuid, err := uuid.Parse(id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UUID"})
			return
		}

		if err := db.First(&task, "id = ?", uuid).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}

		// if err := db.First(&task, id).Error; err != nil {
		// 	c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		// 	return
		// }

		db.Delete(&task)
		c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
	})

	// 8080ポートでサーバーを起動
	r.Run(":8080")
}

type Task struct {
	ID          uuid.UUID `gorm:"primary_key"`
	Task        string    `gorm:"size:255"`
	IsCompleted bool      `gorm:"default:false"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
