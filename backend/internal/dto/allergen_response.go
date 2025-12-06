package dto

import "backend/internal/model"

type AllergenResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
} // @name AllergenResponse

func ToAllergenResponse(model model.Allergen) AllergenResponse {
	return AllergenResponse{
		ID:          model.ID.String(),
		Name:        model.Name,
		Description: model.Description,
	}
}

func ToAllergenResponses(models []model.Allergen) []AllergenResponse {
	responses := make([]AllergenResponse, len(models))
	for i, allergen := range models {
		responses[i] = ToAllergenResponse(allergen)
	}
	return responses
}
