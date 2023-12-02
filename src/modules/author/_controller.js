const express = require("express");
const AddAuthor = require("./add-author");
const ListAuthor = require("./list-author");
const DelteAuthor = require("./delete-author");
const UpdateAuthors = require("./edit-author");
const FindByAuthors = require("./find-authors");
const UnDelteAuthor = require("./undelete-author");
const LoginAuhtor = require("./login-author");
const historyVideos = require("./me-history-videos");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const add_auhtor = async (req, res, next) => {
  try {
    let result = await AddAuthor({ body: req.body, file: req.file });
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

const list_author = async (req, res, next) => {
  try {
    let result = await ListAuthor();
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

const delete_author = async (req, res, next) => {
  try {
    let result = await DelteAuthor({ params: req.params });
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

const updated_author = async (req, res, next) => {
  try {
    let result = await UpdateAuthors({ params: req.params, body: req.body });
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

const find_author_byid = async (req, res, next) => {
  try {
    let result = await FindByAuthors({ params: req.params });
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
const undelete_author = async (req, res, next) => {
  try {
    let result = await UnDelteAuthor({ params: req.params });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const login_author = async (req, res, next) => {
  try {
    let result = await LoginAuhtor({ body: req.body });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const user_history = async (req, res, next) => {
  try {
    let result = await historyVideos({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  add_auhtor,
  list_author,
  delete_author,
  updated_author,
  find_author_byid,
  undelete_author,
  login_author,
  user_history,
};
