import express from "express";
const ROUTER = express.Router();

import * as PRODUCT_CONTROLLER from "../controllers/product";
import { resize, upload } from "../middlewares/upload";
import auth from "../middlewares/verifyToken";

ROUTER.get("/", PRODUCT_CONTROLLER.GET_LIST_PRODUCTS);

ROUTER.post(
  "/",
  auth,
  upload.single("imageUrl"),
  resize,
  PRODUCT_CONTROLLER.CREATE_PRODUCT
);

ROUTER.patch(
  "/:id",
  auth,
  upload.single("imageUrl"),
  resize,
  PRODUCT_CONTROLLER.UPDATE_PRODUCT
);

ROUTER.delete("/:id", PRODUCT_CONTROLLER.DELETE_PRODUCT);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - filename
 *          - price
 *          - description
 *          - author
 *          - category
 *          - provider
 *          - publisher
 *          - stocks
 *        properties:
 *          id:
 *            type: String
 *            description: the auto-generated id of the product
 *          filename:
 *            type: String,
 *            description: file name of the product
 *          title:
 *            type: String,
 *            description: title of the product
 *          price:
 *            type: Number,
 *            description: price of the product
 *          description:
 *            type: String
 *            description: description of the product
 *          url:
 *            type: String
 *            description: url of the product
 *          thumb:
 *            type: String,
 *            description: thumbnail of the product
 *          author:
 *            type: Schema.Types.ObjectId
 *            description: author of the product
 *          category:
 *            type: Schema.Types.ObjectId
 *            description: category of the product
 *          provider:
 *            type: Schema.Types.ObjectId
 *            description: provider of the product
 *          publisher:
 *            type: Schema.Types.ObjectId
 *            description: publisher of the product
 *          stocks:
 *            type: Number
 *            description: stocks of the product
 *        example:
 *          id:
 *          filename:
 *          title:
 *          price:
 *          description:
 *          url:
 *          thumb:
 *          author:
 *          category:
 *          provider:
 *          publisher:
 *          stocks:
 */

/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    summary: Returns the list of all the products
 *    responses:
 *      200:
 *        description: The list of the products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

export default ROUTER;
