const express = require("express");
const usersControllers = require("../../controllers/users.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(usersControllers.getAllUsers)

  /**
   * @api {post} /tools save a tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(usersControllers.saveAUser);


router.route("/random").get(usersControllers.randomUser)
router.route("/all").get(usersControllers.getAllUsers)
router.route("/save").post(usersControllers.saveAUser);
router.route("/update/:id").patch(usersControllers.patchSingleUser);
router.route("/bulk-update").patch(usersControllers.bulkUpdate);
router.route("/delete/:id").delete(usersControllers.delete);
// router
//   .route("/:id")
//   .get(viewCount, limiter, usersControllers.getToolDetail)
//   .patch(usersControllers.updateTool)
//   .delete(usersControllers.deleteTool);

module.exports = router;
