import { Router } from "express";

import activityController from "../controllers/activityController.js";
import categoryController from "../controllers/categoryController.js";
import memberController from "../controllers/memberController.js";
import subCategoryController from "../controllers/subCategoryController.js";
import fetchYelpController from "../controllers/fetchYelpController.js";
import authMiddleware from "../helpers/auth.middleware.js";
import authController from "../controllers/authController.js";
import favoriteController from "../controllers/favoriteController.js";

const router = Router();

//Members

//router.get("/member/:id/search", memberController.getResults);
router.get("/member", memberController.getAllMembers);
router.post("/register", memberController.createMember);
router.get("/member/:id(\\d+)", memberController.getMemberByPk);
router.patch("/member/:id(\\d+)", memberController.modifyMember);
router.delete("/member/:id(\\d+)", memberController.deleteMember);
router.get(
	"/member/:id(\\d+)/favorite",
	favoriteController.getAllFavoritesByMember
);
router.post("/member/:id(\\d+)/favorite", favoriteController.postOneFavorite);
router.get(
	"/member/:userId(\\d+)/favorite/:favoriteId",
	favoriteController.getOneFavorite
);
router.delete(
	"/member/:userId(\\d+)/favorite/:favoriteId(\\d+)",
	favoriteController.deleteOneFavorite
);

//Authentification

router.post("/login", authController.login);
router.get("/logout", authController.logout);

// tokens validity and regenerate
router.get("/token-validity", authController.tokenValidity);

// Reset Passwords
router.post("/reset-password", authController.resetPassword);

//Category

router.get(
	"/category",
	authMiddleware.auth,
	categoryController.getAllCategories
);
router.get("/category/:id(\\d+)", categoryController.getCategoryByPk);
router.get(
	"/category/:id(\\d+)/sub_category",
	categoryController.getCategoryWithSubCategories
);
router.post("/category", categoryController.createCategory);
router.patch("/category/:id(\\d+)", categoryController.modifyCategory);
router.delete("/category/:id(\\d+)", categoryController.deleteCategory);

//subCategory

router.get("/sub_category", subCategoryController.getAllSubCategories);
router.get("/sub_category/:id(\\d+)", subCategoryController.getSubCategoryByPk);
// router.get(
// 	"/sub_category/:id(\\d+)/activity",
// 	subCategoryController.getSubCategoryWithActivities
// );
router.post("/sub_category", subCategoryController.createSubCategory);
router.patch(
	"/sub_category/:id(\\d+)",
	subCategoryController.modifySubCategory
);
router.delete(
	"/sub_category/:id(\\d+)",
	subCategoryController.deleteSubCategory
);

//activity

router.get("/activity", activityController.getAllActivities);
router.get("/activity/:id(\\d+)", activityController.getActivityByPk);
router.post("/activity", activityController.createActivity);
router.patch("/activity/:id(\\d+)", activityController.modifyActivity);
router.delete("/activity/:id(\\d+)", activityController.deleteActivity);

// fetchYelp

router.post("/yelp", fetchYelpController.getFetchYelp);

export default router;
