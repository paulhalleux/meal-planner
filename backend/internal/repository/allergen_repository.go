package repository

import (
	"backend/internal/model"

	"gorm.io/gorm"
)

type AllergenRepository struct {
	db *gorm.DB
}

func NewAllergenRepository(db *gorm.DB) *AllergenRepository {
	return &AllergenRepository{db: db}
}

func (r *AllergenRepository) GetAllAllergens() ([]model.Allergen, error) {
	var allergens []model.Allergen
	result := r.db.Find(&allergens)
	return allergens, result.Error
}
