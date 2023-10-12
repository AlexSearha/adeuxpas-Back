import subCategoryDatamapper from "../models/subCategoryDatamapper.js";
//import { ApiError } from "../helpers/errorHandler.js";

export default {
  async getAllSubCategories(request, response) {
    const subCategories = await subCategoryDatamapper.findAll();

    return response.json(subCategories);
  },

  async getSubCategoryByPk(request, response) {
    const subCategory = await subCategoryDatamapper.findByPk(request.params.id);

    if (!subCategory) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response.status(400).json({ error: "Sous-catégorie inconnue" });
    }

    return response.json(subCategory);
  },

  async getSubCategoryWithActivities(request, response) {
    const subCategoryWithActivities = await subCategoryDatamapper.findAllByPk(
      request.params.id,
      request.body,
    );
    console.log(subCategoryWithActivities);

    if (!subCategoryWithActivities) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response
        .status(400)
        .json({ error: "Veuillez vérifier la saisie" });
    }

    return response.json(subCategoryWithActivities);
  },

  async createSubCategory(request, response) {
    const newSubCategory = await subCategoryDatamapper.insert(request.body);
    console.log(newSubCategory);

    if (!newSubCategory) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response
        .status(400)
        .json({ error: "Sous-catégorie idéjà existante" });
    }

    return response.json(newSubCategory);
  },

  async modifySubCategory(request, response) {
    const modifySubCategory = await subCategoryDatamapper.update(
      request.params.id,
      request.body,
    );
    console.log(modifySubCategory);

    if (!modifySubCategory) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response.status(400).json({ error: "Sous-catégorie inconnue" });
    }

    return response.json(modifySubCategory);
  },

  async deleteSubCategory(request, response) {
    const deleteSubCategory = await subCategoryDatamapper.delete(
      request.params.id,
    );
    console.log(deleteSubCategory);

    if (!deleteSubCategory) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response.status(400).json({ error: "Sous-catégorie inconnue" });
    }

    return response.status(204).json(deleteSubCategory);
  },
};
