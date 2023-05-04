const config = require("config")
const axios = require("axios")

/**
 * Class containing necessary functions for routes in index.js
 * @type {Controller}
 */
module.exports = class Controller {

  /**
     * Getting all HoldingValues and posting this to /investments/export in 'investment' service
     * If successfully received by 'investment' service, then returning this to the get route
     * @returns {Promise<*[]>}: HoldingValue[]
     */
  async generateReport() {
    const report = await this.getAllInvestmentValue()

    // If report has no data, return it without calculating the holding values
    if (report.length <= 0) {
      return report
    }

    return await axios.post(`${config.investmentsServiceUrl}/investments/export`, report)
    // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.status === 204) {
          console.log("Report sent!")
          return report
        }
      })
      .catch(e => console.error(e))
  }

  /**
     * Getting all HoldingValue objects
     * @returns {Promise<*[]>}: HoldingValue object |User|First Name|Last Name|Date|Holding|Value|
     */
  async getAllInvestmentValue() {
    const investments = await this.getAllInvestments()

    // If investments has no data, return it without calculating the holding values
    if (investments.length <= 0) {
      return investments
    }

    const holdingValues = []

    // Calculate the holding values for all investments and add these to the array
    for (const investment of investments) {
      const holdingValue = await this.calculateHoldingValuesForInvestment(investment)
      holdingValues.push(holdingValue)
    }

    return holdingValues
  }

  /**
     * Getting HoldingValue for a specific Investment
     * @param id: Investment Id
     * @returns {Promise<*[]>}: HoldingValue[]
     */
  async getInvestmentValue(id) {
    const investment = await this.getInvestment(id)

    // If investment has no data, return it without calculating the holding values
    if (investment.length <= 0) {
      return investment
    }

    return await this.calculateHoldingValuesForInvestment(investment[0])
  }

  /**
     * Creating HoldingValue objects for a specific Investment object
     * @param investment: Investment object
     * @returns {Promise<*[]>}: HoldingValues[]: |User|First Name|Last Name|Date|Holding|Value|
     */
  async calculateHoldingValuesForInvestment(investment) {
    const holdingValues = []

    // Looping through all holdings
    for (const holding of investment.holdings) {
      // Getting the holding account
      const holdingAccount = await this.getHoldingAccount(holding.id)

      // Creating HoldingValue object
      const holdingValue = {
        "userId": investment.userId,
        "firstName": investment.firstName,
        "lastName": investment.lastName,
        "date": investment.date,
        "holding": holdingAccount.name,
        "value": investment.investmentTotal * holding.investmentPercentage,
      }

      // Pushing object to holdingValues for all holding values to be returned
      holdingValues.push(holdingValue)
    }

    // Returning the array with all holdingValues
    return holdingValues
  }

  /**
     * Getting investments from 'investments' service
     * @returns {Promise<axios.AxiosResponse<any>>}: Investment object array
     */
  async getAllInvestments() {
    return await axios.get(`${config.investmentsServiceUrl}/investments`)
      .then((res) => {
        return res.data
      })
      .catch(e => console.error(e))
  }

  /**
     * Getting investment from 'investments' service
     * @param id: Investment Id
     * @returns {Promise<axios.AxiosResponse<any>>}: Investment object
     */
  async getInvestment(id) {
    return await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
      .then((res) => {
        return res.data
      })
      .catch(e => console.error(e))
  }

  /**
     * Getting holding account from 'financial-companies' service
     * @param id: Holding Id
     * @returns {Promise<unknown>}: Holding object
     */
  async getHoldingAccount(id) {
    return await axios.get(`${config.financialCompaniesServiceUrl}/companies/${id}`)
      .then((res) => {
        return res.data
      })
      .catch(e => console.error(e))
  }
}
