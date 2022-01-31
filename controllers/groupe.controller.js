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

module.exports.getGroupesByUser = async (req, res, next) => {
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

    res.status(200).send({ data: userWithGroupe });
  } catch (error) {
    next(error);
  }
};

module.exports.createImageForGroupe = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupeId },
    } = req;

    const [count, [updatedGroupe]] = await Groupe.update(
      { imagePath: filename },
      {
        where: { id: groupeId },
        returning: true,
      }
    );
    res.status(200).send({ data: { updatedGroupe } });
  } catch (error) {
    next(error);
  }
};

module.exports.addUsetToGroupe = async (req, res, next) => {
  try {
    const {
      body: { userId },
      params: { groupeId },
    } = req;

    const groupe = await Groupe.findByPk(groupeId);
    if (!groupeId) {
      return next(createError(404, "Groupe Not Found"));
    }
    const user = await User.findByPk(userId);
    if (!userId) {
      return next(createError(404, "User Not Found"));
    }

    await groupe.addUser(user);
    // const groupeWithUsers = await groupe.getUsers({
    //   include:[Groupe]
    // })

    const groupeWithUsers = await Groupe.findByPk(groupeId, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(201).send({ data: groupeWithUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.removeGroupe = async (req, res, next) => {
  try {
    const {params:{groupeId}} = req
        const groupe = await Groupe.findByPk(groupeId)
        await groupe.destroy()
        res.status(401).send(groupe)
  } catch (error) {
    next(error)
  }
};

