describe("Task Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should add a new task", () => {
    // Вводим название задачи в инпут
    cy.get('input[placeholder="Введите название задачи"]')
      .type("New Task")
      .should("have.value", "New Task");

    // Нажимаем кнопку "Добавить"
    cy.get("button").contains("Добавить").click();

    // Проверяем, что задача добавлена в список
    cy.contains("New Task").should("exist");
  });

  it("should not add an empty task", () => {
    // Нажимаем кнопку "Добавить" без ввода значения
    cy.get("button").contains("Добавить").click();

    // Проверяем, что задача не добавлена
    cy.contains("Введите название задачи").should("exist");
  });

  it('should display active tasks when "Active" is selected', () => {
    // Добавляем несколько задач
    cy.get('input[placeholder="Введите название задачи"]').type("Task 1");
    cy.get("button").contains("Добавить").click();

    cy.get('input[placeholder="Введите название задачи"]').type("Task 2");
    cy.get("button").contains("Добавить").click();

    // Завершим одну из задач
    cy.get('input[name="Task 1"]').check();
    cy.get("button").contains("Завершить").click();

    // Переключаемся на активные задачи
    cy.get("label").contains("Активные").click();

    // Проверяем, что отображаются только активные задачи
    cy.contains("Task 2").should("exist"); // Должна отображаться активная задача
    cy.contains("Task 1").should("not.exist"); // Завершенная задача не должна отображаться
  });

  it('should display closed tasks when "Сompleted" is selected', () => {
    // Добавляем несколько задач
    cy.get('input[placeholder="Введите название задачи"]').type("Task 3");
    cy.get("button").contains("Добавить").click();

    cy.get('input[placeholder="Введите название задачи"]').type("Task 4");
    cy.get("button").contains("Добавить").click();

    // Одну задачу завершаем
    cy.get('input[name="Task 3"]').first().check();
    cy.get("button").contains("Завершить").click();

    // Завершенная задаче не должна отображаться
    cy.contains("Task 3").should("not.exist");
    cy.contains("Task 4").should("exist");

    // Переключаемся на завершенные задачи
    cy.get("label").contains("Завершенные").click();

    // Проверяем, что отображаются только завершенные задачи
    cy.contains("Task 3").should("exist");
    cy.contains("Task 4").should("not.exist");
  });

  it('should display all tasks when "All" is selected', () => {
    // Добавляем несколько задач
    cy.get('input[placeholder="Введите название задачи"]').type("Task 5");
    cy.get("button").contains("Добавить").click();

    cy.get('input[placeholder="Введите название задачи"]').type("Task 6");
    cy.get("button").contains("Добавить").click();

    // Одну задачу завершаем
    cy.get('input[name="Task 5"]').first().check();
    cy.get("button").contains("Завершить").click();

    // Переключаемся на все задачи
    cy.get("label").contains("Все").click();

    // Проверяем, что отображаются все задачи
    cy.contains("Task 5").should("exist");
    cy.contains("Task 6").should("exist");
  });
});
