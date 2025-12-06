package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RecipeCategory struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Name        string
	Description *string

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
} // @name RecipeCategory
