const express = require("express");
const CreateChanel = require("./create-chanel");
const AllChannels = require("./all-channels");
const UpdateUsers = require("./edit-channels");
const delete_chanel = require("./delete-channels");
const subscribe_channel = require("./subscribe-channels");
const FindByIdChannel = require("./find-chanel");
const checkSubscription = require("../../shared/auth/isSubscribed");
const UnDeleteChanel = require("./undelete-channel");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const create_chanel = async (req, res, next) => {
  try {
    const result = await CreateChanel({ body: req.body, user: req.user });
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

const all_channels = async (req, res, next) => {
  try {
    const result = await AllChannels();
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

const edit_chanels = async (req, res, next) => {
  try {
    let result = await UpdateUsers({ params: req.params, body: req.body });
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

const delete_chanels = async (req, res, next) => {
  try {
    let result = await delete_chanel({ params: req.params, body: req.body });
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

const subscribe_channels = async (req, res, next) => {
  try {
    let result = await subscribe_channel({
      params: req.params,
      user: req.user,
    });
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

const find_id_channel = async (req, res, next) => {
  try {
    let result = await FindByIdChannel({ params: req.params });
    let subscribe_status = await checkSubscription({
      params: req.params,
      user: req.user,
    });
    res
      .status(200)
      .json({ data: result, subscribe_status: subscribe_status.status });
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

const undelete_chanels = async (req, res, next) => {
  try {
  } catch (error) {
    let result = await UnDeleteChanel({ params: req.params });
    res.status(200).json({ data: result });
    next(error);
  }
};

module.exports = {
  create_chanel,
  all_channels,
  edit_chanels,
  delete_chanels,
  subscribe_channels,
  find_id_channel,
  undelete_chanels,
};
