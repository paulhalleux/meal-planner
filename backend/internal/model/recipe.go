package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Recipe struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Title       string
	Description *string

	Ingredients []RecipeIngredient `gorm:"foreignKey:RecipeRef;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Categories  []RecipeCategory   `gorm:"many2many:recipe_to_categories;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
} // @name Recipe
