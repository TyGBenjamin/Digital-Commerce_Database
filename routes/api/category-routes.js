const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newData = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name,
      },
      {
        // Gets a category based on the category_id given in the request parameters
        where: {
          category_id: req.params.category_id,
        },
      }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(404).json({ message: ` Update Unsuccessful` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value

  try {
    const deletedCategory = await Category.destroy({
      // Gets a category based on the category_id given in the request parameters
      where: {
        category_id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res
        .status(404)
        .json({ message: `Delete Unsucessful, no category with that id` });
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
