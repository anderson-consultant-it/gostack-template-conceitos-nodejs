const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4')
// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const newRepository = {id: uuid(),title, url, techs, likes: 0}
  repositories.push(newRepository)
  return response.status(200).json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const repoIndex = repositories.findIndex(repo=> repo.id === id)
  if (repoIndex < 0){
    return response.status(400).json({error: "Repository Not Found"})
  }

  const likes = repositories[repoIndex].likes
  const repository = {id,title, url, techs, likes}

  repositories[repoIndex] = repository
  return response.status(200).json(repository)

  
  //const results = repositories.filter(repository => repository.id === id)


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repo=> repo.id === id)
  
  if (repoIndex < 0){
    return response.status(400).json({error: "Repository Not Found"})
  }

  repositories.splice(repoIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repo=> repo.id === id)

  if (repoIndex < 0){
    return response.status(400).json({error: "Repository Not Found"})
  }

  repositories[repoIndex].likes += 1;
  return response.status(200).json({likes: repositories[repoIndex].likes})
});

module.exports = app;
