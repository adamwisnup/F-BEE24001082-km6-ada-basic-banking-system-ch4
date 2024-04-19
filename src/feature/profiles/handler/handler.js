const ProfilesService = require("../service/service");

class ProfilesHandler {
  async createProfile(req, res) {
    try {
      const data = req.body;
      const profile = await ProfilesService.createProfile(data);
      res.status(201).json({
        status: true,
        message: "Profile created successfully",
        data: profile,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Profile created failed",
        data: null,
      });
    }
  }

  async findAllProfiles(req, res) {
    try {
      const profiles = await ProfilesService.findAllProfiles();
      res.status(200).json({
        status: true,
        message: "Profiles retrieved successfully",
        data: profiles,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving profiles",
        data: null,
      });
    }
  }

  async findProfileById(req, res) {
    try {
      const profile = await ProfilesService.findProfileById(req.params.id);
      if (!profile) {
        return res.status(404).json({
          status: false,
          message: "Profile not found",
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "Profile retrieved successfully",
        data: profile,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "An error occurred while retrieving profile",
        data: null,
      });
    }
  }
}

module.exports = new ProfilesHandler();
