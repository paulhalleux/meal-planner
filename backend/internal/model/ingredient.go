package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Ingredient struct {
	ID uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`

	Name          string
	ShortName     *string
	Description   *string
	Calories      *int64
	Proteins      *int64
	Fats          *int64
	Carbohydrates *int64

	UnitRef   uuid.UUID
	Unit      Unit       `gorm:"foreignKey:UnitRef;references:ID"`
	Allergens []Allergen `gorm:"many2many:ingredient_allergens;"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt
} // @name Ingredient
