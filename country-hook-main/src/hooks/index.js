import { useState,useEffect } from 'react'
import axios from 'axios'
export const useCountry = (name) => {
  console.log(name)
  const [countries, setCountries] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  const country = countries.filter(element => element.name.common.toLowerCase()==name.toLowerCase())
  console.log("country",country)
  if (country.length===0) {
    return null
  }
  const returnCountry = country?country[0]:null
  console.log("returnCountry",returnCountry)
  return country[0]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}