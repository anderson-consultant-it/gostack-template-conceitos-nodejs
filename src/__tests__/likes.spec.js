const request = require("supertest");
const app = require("../app");

describe("Likes", () => {
  it("should be able to give a like to the repository", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

      console.log(repository.body)

    let response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    console.log(response.body)

    expect(response.body).toMatchObject({
      likes: 1
    });

    console.log(response.body)

    response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );
console.log(response.body)
    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400);
  });
});
