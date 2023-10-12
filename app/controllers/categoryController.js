import categoryDatamapper from "../models/categoryDatamapper.js";
//import { ApiError } from "../helpers/errorHandler.js";

export default {
  async getAllCategories(request, response) {
    const categories = await categoryDatamapper.findAll();
    console.log(categories);

    return response.status(200).json(categories);
  },

  async getCategoryByPk(request, response) {
    const category = await categoryDatamapper.findByPk(request.params.id);
    console.log(category);

    if (!category) {
      //throw new apiService("Catégorie inconnue", { statusCode: 404 });
      return response.status(404).json({ error: "Catégorie inconnue" });
    }

    return response.status(200).json(category);
  },

  async getCategoryWithSubCategories(request, response) {
    const categoryWithSubCategories = await categoryDatamapper.findAllByPk(
      request.params.id,
      request.body,
    );
    console.log(categoryWithSubCategories);

    if (!categoryWithSubCategories) {
      //throw new ApiError("Veuillez vérifier la saisie", { statusCode: 400 });
      return response
        .status(400)
        .json({ error: "Veuillez vérifier la saisie" });
    }

    return response.status(200).json(categoryWithSubCategories);
  },

  async createCategory(request, response) {
    const newCategory = await categoryDatamapper.insert(request.body);
    console.log(newCategory);

    if (!newCategory) {
      //throw new ApiError("Catégorie déjà existante", { statusCode: 400 });
      return response.status(400).json({ error: "Catégorie déjà existante" });
    }

    return response.status(200).json(newCategory);
  },

  async modifyCategory(request, response) {
    const modifyCategory = await categoryDatamapper.update(
      request.params.id,
      request.body,
    );
    console.log(modifyCategory);

    if (!modifyCategory) {
      //throw new ApiError("Catégorie inconnue", { statusCode: 404 });
      return response.status(404).json({ error: "Catégorie inconnue" });
    }

    return response.status(200).json(modifyCategory);
  },

  async deleteCategory(request, response) {
    const deleteCategory = await categoryDatamapper.delete(request.params.id);
    console.log(deleteCategory);

    if (!deleteCategory) {
      ///throw new ApiError("Catégorie inconnue", { statusCode: 404 });
      return response.status(404).json({ error: "Catégorie inconnue" });
    }

    return response.status(204).json(deleteCategory);
  },
};
