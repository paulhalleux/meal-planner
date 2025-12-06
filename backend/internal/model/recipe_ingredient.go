package model

import (
	"time"

	"github.com/google/uuid"
)

type RecipeIngredient struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Quantity float64

	RecipeRef       uuid.UUID
	IngredientRef   uuid.UUID
	Ingredient      Ingredient `gorm:"foreignKey:IngredientRef;references:ID"`
	OverrideUnitRef *uuid.UUID
	OverrideUnit    *Unit `gorm:"foreignKey:OverrideUnitRef;references:ID"`

	CreatedAt time.Time
} // @name RecipeIngredient
