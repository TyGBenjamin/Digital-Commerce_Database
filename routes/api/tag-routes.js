const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Find All Tags

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Select Tag based on its ID

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating New Tag

router.post("/", async (req, res) => {
  try {
    const newData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Tag info based on chosen id
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name,
      },
      {
        // Gets a tag based on the tag_id given in the request parameters
        where: {
          tag_id: req.params.tag_id,
        },
      }
    );
    res.json(updatedTag);
  } catch (err) {
    res.status(404).json({ message: ` Update Unsuccessful` });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value

  try {
    const deletedTag = await Tag.destroy({
      // Gets a category based on the category_id given in the request parameters
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res
        .status(404)
        .json({ message: `Delete Unsucessful, no Tag with that id` });
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
