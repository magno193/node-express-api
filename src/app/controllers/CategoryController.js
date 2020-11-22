const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);
    if (!category) return response.status(404).json({ error: 'Category not found' });
    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) return response.status(400).json({ error: 'Name is required' });
    await CategoriesRepository.create({ name });
    response.sendStatus(201);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) return response.status(404).json({ error: 'Category not found' });

    if (!name) return response.status(400).json({ error: 'Name is required' });

    const nameExists = await CategoriesRepository.findByName(name);
    if (nameExists) return response.status(400).json({ error: 'Category already exists' });

    await CategoriesRepository.update(id, { name });
    response.sendStatus(200);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
