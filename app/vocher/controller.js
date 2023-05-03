const Vocher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const vocher = await Vocher.find()
        .populate("category")
        .populate("nominals");
      res.render("admin/vocher/view_vocher", {
        vocher,
        alert,
        name: req.session.user.name,
        title: "Halaman vocher",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/vocher");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      console.log(req.session);
      res.render("admin/vocher/create", {
        category,
        nominal,
        name: req.session.user.name,
        title: "Halaman tambah vocher",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const vocher = new Vocher({
              name,
              category,
              nominals,
              thumbnial: filename,
            });

            await vocher.save();

            req.flash("alertMessage", "Berhasil tambah vocher");
            req.flash("alertStatus", "success");

            res.redirect("/vocher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/vocher");
          }
        });
      } else {
        const vocher = new Vocher({
          name,
          category,
          nominals,
        });

        await vocher.save();

        req.flash("alertMessage", "Berhasil tambah vocher");
        req.flash("alertStatus", "success");

        res.redirect("/vocher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      const vocher = await Vocher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");

      res.render("admin/vocher/edit", {
        vocher,
        nominal,
        category,
        name: req.session.user.name,
        title: "Halaman ubah vocher",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/vocher");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const vocher = await Vocher.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${vocher.thumbnial}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Vocher.findOneAndUpdate(
              {
                _id: id,
              },
              {
                name,
                category,
                nominals,
                thumbnial: filename,
              }
            );

            req.flash("alertMessage", "Berhasil ubah vocher");
            req.flash("alertStatus", "success");

            res.redirect("/vocher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/vocher");
          }
        });
      } else {
        await Vocher.findOneAndUpdate(
          {
            _id: id,
          },
          {
            name,
            category,
            nominals,
          }
        );

        req.flash("alertMessage", "Berhasil ubah vocher");
        req.flash("alertStatus", "success");

        res.redirect("/vocher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const vocher = await Vocher.findOneAndRemove({
        _id: id,
      });

      let currentImage = `${config.rootPath}/public/uploads/${vocher.thumbnial}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash("alertMessage", "Berhasil hapus vocher");
      req.flash("alertStatus", "success");

      res.redirect("/vocher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/vocher");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let vocher = await Vocher.findOne({ _id: id });

      let status = vocher.status === "Y" ? "N" : "Y";

      vocher = await Vocher.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/vocher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/vocher");
    }
  },
};
