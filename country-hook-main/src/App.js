import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCountry } from './hooks'
import { useField } from './hooks'

const Country = ({ country }) => {
  console.log("Country inside component",country)
  if (country===null) {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    country.name ?
    <div>
      <h3>{country.name.common} </h3>
      <h4>Capital: {country.capital[0]} </h4>
      <h5>Population {country.population}</h5>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
    :
    <div>
      Name not found
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const country = useCountry(nameInput.value)
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App