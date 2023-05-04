const Controller = require("../controller")
const controller = new Controller()
const assert = require("assert")

describe(("Testing controller functions"), () => {
  it("Gets all investments", async () => {
    const investments = await controller.getAllInvestments()

    assert.equal(investments.length, 7)
  })

  it("Gets an investments from its id", async () => {
    const investment = await controller.getInvestment(1)

    assert.equal(investment.length, 1)
    assert.equal(investment[0].userId, 1)
    assert.equal(investment[0].firstName, "Billy")
  })

  it("Gets a holding account for an id", async () => {
    const holdingAccount = await controller.getHoldingAccount(2)

    assert.equal(holdingAccount.name, "The Small Investment Company")
    assert.equal(holdingAccount.postcode, "SW18UD")
  })

  it("Calculates the holding values for an investment with one holding", async () => {
    const investmentMock = {
      "id": "1",
      "userId": "1",
      "firstName": "Billy",
      "lastName": "Bob",
      "investmentTotal": 1400,
      "date": "2020-01-01",
      "holdings": [{"id": "2", "investmentPercentage": 1}],
    }
    const holdingValues = await controller.calculateHoldingValuesForInvestment(investmentMock)

    assert.equal(holdingValues.length, 1)
    assert.equal(holdingValues[0].firstName, "Billy")
    assert.equal(holdingValues[0].value, 1400)
    assert.equal(holdingValues[0].holding, "The Small Investment Company")
  })

  it("Calculates the holding values for an investment with two holdings", async () => {
    const investmentMock = {
      "id": "4",
      "userId": "2",
      "firstName": "Sheila",
      "lastName": "Aussie",
      "investmentTotal": 22000,
      "date": "2020-02-01",
      "holdings": [{"id": "1", "investmentPercentage": 0.5}, {"id": "2", "investmentPercentage": 0.5}],
    }
    const holdingValues = await controller.calculateHoldingValuesForInvestment(investmentMock)

    assert.equal(holdingValues.length, 2)
    assert.equal(holdingValues[0].firstName, "Sheila")
    assert.equal(holdingValues[0].value, 11000)
  })

  it("Gets the holding values for an investment", async () => {
    const investments = await controller.getInvestmentValue(1)

    assert.equal(investments.length, 1)
    assert.equal(investments[0].firstName, "Billy")
    assert.equal(investments[0].value, 1400)
    assert.equal(investments[0].holding, "The Small Investment Company")
  })

  it("Return empty array when trying to the holding values for an investment that doesnt exist", async () => {
    const investments = await controller.getInvestmentValue(10)

    assert.equal(investments.length, 0)
  })

  it("Gets the holding values for all investments", async () => {
    const holdingValue = await controller.getAllInvestmentValue()

    assert.equal(holdingValue.length, 7)
  })

  it("Can generate report", async () => {
    const investments = await controller.generateReport(1)

    assert.equal(investments.length, 7)
  })
})
