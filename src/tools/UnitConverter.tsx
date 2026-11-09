
import { useState } from 'react'
import './UnitConverter.css'

type Unit = {
  name: string
  factor?: number
  offset?: number
}

type Category = {
  name: string
  units: Unit[]
}

const categories: Category[] = [
  {
    name: 'Length',
    units: [
      { name: 'Millimeter (mm)', factor: 0.001 },
      { name: 'Centimeter (cm)', factor: 0.01 },
      { name: 'Meter (m)', factor: 1 },
      { name: 'Kilometer (km)', factor: 1000 },
      { name: 'Inch (in)', factor: 0.0254 },
      { name: 'Foot (ft)', factor: 0.3048 },
      { name: 'Yard (yd)', factor: 0.9144 },
      { name: 'Mile (mi)', factor: 1609.344 },
    ],
  },
  {
    name: 'Weight',
    units: [
      { name: 'Milligram (mg)', factor: 0.000001 },
      { name: 'Gram (g)', factor: 0.001 },
      { name: 'Kilogram (kg)', factor: 1 },
      { name: 'Metric Ton (t)', factor: 1000 },
      { name: 'Ounce (oz)', factor: 0.0283495 },
      { name: 'Pound (lb)', factor: 0.453592 },
    ],
  },
  {
    name: 'Temperature',
    units: [
      { name: 'Celsius (°C)' },
      { name: 'Fahrenheit (°F)' },
      { name: 'Kelvin (K)' },
    ],
  },
  {
    name: 'Area',
    units: [
      { name: 'Square Meter (m²)', factor: 1 },
      { name: 'Square Kilometer (km²)', factor: 1000000 },
      { name: 'Square Centimeter (cm²)', factor: 0.0001 },
      { name: 'Square Foot (ft²)', factor: 0.092903 },
      { name: 'Acre', factor: 4046.856 },
      { name: 'Hectare (ha)', factor: 10000 },
    ],
  },
  {
    name: 'Volume',
    units: [
      { name: 'Milliliter (ml)', factor: 0.001 },
      { name: 'Liter (L)', factor: 1 },
      { name: 'Cubic Meter (m³)', factor: 1000 },
      { name: 'US Gallon', factor: 3.78541 },
      { name: 'Cup (US)', factor: 0.236588 },
      { name: 'Tablespoon (US)', factor: 0.0147868 },
    ],
  },
  {
    name: 'Speed',
    units: [
      { name: 'Meters/Second (m/s)', factor: 1 },
      { name: 'Kilometers/Hour (km/h)', factor: 0.277778 },
      { name: 'Miles/Hour (mph)', factor: 0.44704 },
      { name: 'Knots (kn)', factor: 0.514444 },
    ],
  },
  {
    name: 'Time',
    units: [
      { name: 'Millisecond (ms)', factor: 0.001 },
      { name: 'Second (s)', factor: 1 },
      { name: 'Minute (min)', factor: 60 },
      { name: 'Hour (h)', factor: 3600 },
      { name: 'Day', factor: 86400 },
      { name: 'Week', factor: 604800 },
    ],
  },
  {
    name: 'Data Storage',
    units: [
      { name: 'Byte (B)', factor: 1 },
      { name: 'Kilobyte (KB)', factor: 1024 },
      { name: 'Megabyte (MB)', factor: 1024 ** 2 },
      { name: 'Gigabyte (GB)', factor: 1024 ** 3 },
      { name: 'Terabyte (TB)', factor: 1024 ** 4 },
    ],
  },
]

function convertTemperature(value: number, from: string, to: string) {
  let celsius = value

  if (from.includes('Fahrenheit')) {
    celsius = (value - 32) * 5 / 9
  } else if (from.includes('Kelvin')) {
    celsius = value - 273.15
  }

  if (to.includes('Fahrenheit')) {
    return celsius * 9 / 5 + 32
  }

  if (to.includes('Kelvin')) {
    return celsius + 273.15
  }

  return celsius
}

function formatResult(value: number) {
  if (!Number.isFinite(value)) return 'Invalid value'
  return Number(value.toPrecision(12)).toLocaleString('en-US', {
    maximumFractionDigits: 10,
  })
}

export default function UnitConverter() {
  const [categoryName, setCategoryName] = useState('Length')
  const [inputValue, setInputValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('Meter (m)')
  const [toUnit, setToUnit] = useState('Kilometer (km)')
  const [copied, setCopied] = useState(false)

  const category = categories.find(
    (item) => item.name === categoryName
  ) || categories[0]

  const convert = () => {
    const value = Number(inputValue)

    if (!Number.isFinite(value) || inputValue.trim() === '') {
      return null
    }

    if (categoryName === 'Temperature') {
      return convertTemperature(value, fromUnit, toUnit)
    }

    const from = category.units.find((unit) => unit.name === fromUnit)
    const to = category.units.find((unit) => unit.name === toUnit)

    if (!from || !to || from.factor === undefined || to.factor === undefined) {
      return null
    }

    return (value * from.factor) / to.factor
  }

  const result = convert()

  const changeCategory = (name: string) => {
    const selected = categories.find((item) => item.name === name)
    if (!selected) return

    setCategoryName(name)
    setFromUnit(selected.units[0].name)
    setToUnit(selected.units[1]?.name || selected.units[0].name)
    setInputValue('1')
    setCopied(false)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setCopied(false)
  }

  const copyResult = async () => {
    if (result === null) return

    try {
      await navigator.clipboard.writeText(formatResult(result))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="unit-converter-tool">
      <div className="unit-converter-heading">
        <div className="unit-converter-icon">📐</div>
        <h2>Unit Converter</h2>
        <p>Convert measurements quickly and accurately.</p>
      </div>

      <div className="unit-converter-card">
        <label htmlFor="unit-category">Select Category</label>

        <select
          id="unit-category"
          value={categoryName}
          onChange={(e) => changeCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="unit-converter-input-section">
          <div className="unit-converter-field">
            <label htmlFor="unit-value">Enter Value</label>
            <input
              id="unit-value"
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setCopied(false)
              }}
              placeholder="Enter a number"
            />
          </div>

          <div className="unit-converter-field">
            <label htmlFor="unit-from">From</label>
            <select
              id="unit-from"
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value)
                setCopied(false)
              }}
            >
              {category.units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="unit-converter-swap"
            onClick={swapUnits}
            aria-label="Swap units"
          >
            ⇅
          </button>

          <div className="unit-converter-field">
            <label htmlFor="unit-to">To</label>
            <select
              id="unit-to"
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value)
                setCopied(false)
              }}
            >
              {category.units.map((unit) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="unit-converter-result">
          <span>Conversion Result</span>

          {result === null ? (
            <strong className="unit-converter-invalid">
              Enter a valid number
            </strong>
          ) : (
            <>
              <strong>{formatResult(result)}</strong>
              <small>{toUnit}</small>
            </>
          )}

          <button
            type="button"
            onClick={copyResult}
            disabled={result === null}
          >
            {copied ? '✓ Copied' : 'Copy Result'}
          </button>
        </div>
      </div>

      <div className="unit-converter-categories">
        <h3>Available Categories</h3>

        <div className="unit-converter-category-grid">
          {categories.map((item) => (
            <button
              type="button"
              key={item.name}
              className={categoryName === item.name ? 'active' : ''}
              onClick={() => changeCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="unit-converter-note">
        <strong>About Unit Converter</strong>
        <p>
          Convert length, weight, temperature, area, volume, speed,
          time and digital storage units. All calculations happen
          locally in your browser.
        </p>
      </div>
    </div>
  )
}
