const express = require("express");
const addAdmin = require("./add-admin");
const loginAdmin = require("./login-admin");
const listAdmin = require("./list-admins");
const showAdmin = require("./show-admin");
const removeAdmin = require("./remove-admin");
const unremoveAdmin = require("./unremove-admin");
const editAdmin = require("./edit-admin");
const changePasswordAdmin = require("./change-password-admin");
const httpValidator = require("../../shared/http-validator");

const {
  postAddAdminSchemas,
  postLoginAdminSchemas,
  patchChangePasswordAdminSchemas,
  patchEditAdminSchemas,
  getShowAdminSchemas,
  deletetAdminSchemas,
  unDeletetAdminSchemas,
} = require("./_schemas");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const add_admin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postAddAdminSchemas);
    let result = await addAdmin({ body: req.body });
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

const login_admin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postLoginAdminSchemas);
    let result = await loginAdmin({ body: req.body });
    res.status(200).json({ data: { token: result } });
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

const list_admin = async (req, res, next) => {
  try {
    let result = await listAdmin();
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

const show_admin = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, getShowAdminSchemas);
    let result = await showAdmin({ params: req.params });
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

const remove_admin = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deletetAdminSchemas);
    let result = await removeAdmin({ params: req.params });
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

const unremove_admin = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, unDeletetAdminSchemas);
    let result = await unremoveAdmin({ params: req.params });
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

const edit_admin = async (req, res, next) => {
  try {
    httpValidator(
      { body: req.body, params: req.params },
      patchEditAdminSchemas,
    );
    let result = await editAdmin({ params: req.params, body: req.body });
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

const change_password_admin = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchChangePasswordAdminSchemas);
    let result = await changePasswordAdmin({
      body: req.body,
      admin: req.user,
    });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  add_admin,
  login_admin,
  list_admin,
  show_admin,
  remove_admin,
  unremove_admin,
  edit_admin,
  change_password_admin,
};
