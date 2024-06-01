const model = require("../models/categoryModel")

var categoryController = {
    selectAllCategories: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error selectAllCategories:", error);
                res.status(500).json(error);
            }
            else res.status(200).json(results);
        }

        model.selectAllCategories(callback);
    },

    createNewCategory: (req, res, next) => {
        const data = {
            name: req.body.name,
            description: req.body.description
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewCategory:", error);
                res.status(500).json(error);
            } else {
                res.status(201).json(results);
            }
        }

        model.createNewCategory(data, callback);
    },

    selectByIdWithCategoryInfo: (req, res, next) => {
        const data = {
            catid: req.params.catid
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readCategoryById:", error);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: "Category not found"
                    });
                }
                else res.status(200).json(results[0]);
            }
        }

        model.selectByIdWithCategoryInfo(data, callback);
    }
}

module.exports = categoryController;