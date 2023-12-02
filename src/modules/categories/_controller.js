const express = require("express");
const add = require("./add-categories");
const list = require("./list-categories");
const unremove = require("./undelete-categories");
const edit = require("./edit-categories");
const removecategory = require("./delete-categories");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCategory = async (req, res, next) => {
  try {
    const result = await add({ body: req.body });

    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const listCategory = async (req, res, next) => {
  try {
    const result = await list();

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const removeCategory = async (req, res, next) => {
  try {
    const result = await removecategory({ params: req.params });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const unremoveCategory = async (req, res, next) => {
  try {
    const result = await unremove({ params: req.params });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const editCategory = async (req, res, next) => {
  try {
    const result = await edit({ params: req.params, body: req.body });

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  editCategory,
  removeCategory,
  unremoveCategory,
  addCategory,
  listCategory,
};
