package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FileResourceType string

const (
	FileResourceTypeIngredientThumbnail FileResourceType = "ingredient_thumbnail"
	FileResourceTypeRecipeThumbnail     FileResourceType = "recipe_thumbnail"
	FileResourceTypeRecipeStepThumbnail FileResourceType = "recipe_step_thumbnail"
	FileResourceTypeRecipeResultImage   FileResourceType = "recipe_result_image"
)

type FileStorageProvider string

const (
	FileStorageProviderLocal FileStorageProvider = "local"
)

type FileResource struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name      string
	Type      FileResourceType
	Provider  FileStorageProvider
	Location  string
	SizeBytes int64
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
} // @name FileResource
