const ObjectId = require("mongoose").Types.ObjectId;
const express = require("express");
const { NotFoundError } = require("../errors");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isMongoId = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw new NotFoundError("Sorry, Id incorrect!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isMongoId;
