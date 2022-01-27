const { Groupe, User } = require("../models");
const createError = require("http-error");
const _ = require("lodash");

module.exports.postOneGroupe = async (req, res, next) => {
  try {
    const { body } = req;

    const value = _.pick(body, ["name", "imagePath", "description"]);

    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, "User Not Found"));
    }

    const groupe = await Groupe.create({
      ...value,
    });

    await groupe.addUser(user);

    res.status(201).send({ data: { groupe } });
  } catch (error) {
    next(error);
  }
};

module.exports.getGrouresByUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const userWithGroupe = await User.findByPk(userId, {
      include: [{ model: Groupe, through: { attributes: [] } }],
      attributes: {
        exclude: ["password"],
      },
    });
    if (!userWithGroupe) {
      return next(createError(404, "User Not Found"));
    }

    res.status(200).send({ data: { userWithGroupe } });
  } catch (error) {
    next(error);
  }
};

module.exports.createImageForGroupe = async (req, res, next) => {
  try {
    
    const {file: {filename}, params:{groupeId}} = req

    const [count, [updatedGroupe]] = await Groupe.update(
      {imagePath:filename},
      {
        where:{id:groupeId},
        returning: true
      }
    )
     res.status(200).send({data:{updatedGroupe}})
  } catch (error) {
    next(error)
  }
};
