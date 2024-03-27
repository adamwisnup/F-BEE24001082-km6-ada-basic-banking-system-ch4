const ProfilesService = require('../service/service');
const CreateProfileRequest = require('./request');
const {CreateProfileResponse, FindProfilesResponse} = require('./response');


class ProfilesHandler {
    async createProfile(req, res) {
        try {
            const requestData = new CreateProfileRequest(req.body);
            const profile = await ProfilesService.createProfile(requestData);
            const responseData = new CreateProfileResponse(profile);
            res.status(201).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findAllProfiles(req, res) {
        try {
            const profiles = await ProfilesService.findAllProfiles();
            const responseData = new FindProfilesResponse(profiles);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async findProfileById(req, res) {
        try {
            const profile = await ProfilesService.findProfileById(req.params.id);
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            const responseData = new FindProfilesResponse(profile);
            res.status(200).json(responseData);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = new ProfilesHandler();