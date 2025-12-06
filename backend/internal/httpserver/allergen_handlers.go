package httpserver

import (
	"backend/internal/dto"
	"backend/internal/repository"

	"github.com/gin-gonic/gin"
)

type AllergensHandlers struct {
	repo *repository.AllergenRepository
}

func NewAllergensHandlers(
	repo *repository.AllergenRepository,
) *AllergensHandlers {
	return &AllergensHandlers{
		repo: repo,
	}
}

func (w *AllergensHandlers) Register(router gin.IRoutes) {
	router.GET("/allergens", w.GetAllAllergens)
}

// GetAllAllergens godoc
// @ID           GetAllAllergens
// @Summary      Get all allergens
// @Description  Retrieves a list of all allergens
// @Tags         Allergens
// @Produce      json
// @Success      200  {array}   dto.AllergenResponse
// @Failure      500  {object}  gin.H
// @Router       /allergens [get]
func (w *AllergensHandlers) GetAllAllergens(c *gin.Context) {
	result, err := w.repo.GetAllAllergens()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, dto.ToAllergenResponses(result))
}
