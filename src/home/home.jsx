import React, { useState, useEffect } from "react";
import './home.css';


export default function Home() {

    // Estados
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState(0);
    const [convertedUnit, setConvertedUnit] = useState('unidad');

    // Objeto con las opciones para cada categoría
    const categoryOptions = {
        Longitud: ['Kilómetros', 'Metros', 'Centímetro', 'Milímetro', 'Millas', 'Pies', 'Pulgadas', 'Yardas'],
        Masa: ['Kilogramos', 'Gramos', 'Miligramo', 'Libras', 'Onzas', 'Toneladas'],
        Volumen: ['Litros', 'Mililitros', 'Galones', 'Onzas líquidas', 'Pintas'],
        Área: ['Metros cuadrados', 'Pies cuadrados', 'Hectáreas', 'Acre', 'Kilómetros cuadrados'],
        Temperatura: ['Grado Celsius', 'Grado Fahrenheit', 'Kelvin']
    };

    // Factores de conversión (en metros, kilogramos, litros, etc.)
    const conversionFactors = {
        Longitud: {
            'Kilómetros': 1000,
            'Metros': 1,
            'Centímetro': 0.01,
            'Milímetro': 0.001,
            'Millas': 1609.34,
            'Pies': 0.3048,
            'Pulgadas': 0.0254,
            'Yardas': 0.9144
        },
        Masa: {
            'Kilogramos': 1,
            'Gramos': 0.001,
            'Miligramo': 0.000001,
            'Libras': 0.453592,
            'Onzas': 0.0283495,
            'Toneladas': 1000
        },
        Volumen: {
            'Litros': 1,
            'Mililitros': 0.001,
            'Galones': 3.78541,
            'Onzas líquidas': 0.0295735,
            'Pintas': 0.473176
        },
        Área: {
            'Metros cuadrados': 1,
            'Pies cuadrados': 0.092903,
            'Hectáreas': 10000,
            'Acre': 4046.86,
            'Kilómetros cuadrados': 1000000
        }
    };

    // Manejadores de eventos
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        // Resetear unidades al cambiar categoría
        setFromUnit('');
        setToUnit('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFromUnitChange = (e) => {
        setFromUnit(e.target.value);
    };

    const handleToUnitChange = (e) => {
        setToUnit(e.target.value);
    };

    // Función para convertir temperatura (caso especial)
    const convertTemperature = (value, from, to) => {
        let celsius;
        // Convertir a Celsius primero
        switch (from) {
            case 'Grado Celsius':
                celsius = value;
                break;
            case 'Grado Fahrenheit':
                celsius = (value - 32) * 5 / 9;
                break;
            case 'Kelvin':
                celsius = value - 273.15;
                break;
            default:
                return 0;
        }

        // Convertir de Celsius a la unidad destino
        switch (to) {
            case 'Grado Celsius':
                return celsius;
            case 'Grado Fahrenheit':
                return (celsius * 9 / 5) + 32;
            case 'Kelvin':
                return celsius + 273.15;
            default:
                return 0;
        }
    };

    // Función principal de conversión
    const convertUnits = () => {
        if (!inputValue || !fromUnit || !toUnit || !selectedCategory) return;

        const value = parseFloat(inputValue);
        if (isNaN(value)) return;

        if (selectedCategory === 'Temperatura') {
            const convertedValue = convertTemperature(value, fromUnit, toUnit);
            setResult(convertedValue.toFixed(2));
            setConvertedUnit(toUnit);
        } else {
            const fromFactor = conversionFactors[selectedCategory][fromUnit];
            const toFactor = conversionFactors[selectedCategory][toUnit];
            const convertedValue = (value * fromFactor) / toFactor;
            setResult(convertedValue.toFixed(4)); // Mostrar más decimales para valores pequeños
            setConvertedUnit(toUnit);
        }
    };

    // Efecto para realizar la conversión cuando cambian los valores
    useEffect(() => {
        convertUnits();
    }, [inputValue, fromUnit, toUnit, selectedCategory]);


    return (
        <div>
            <h1>CONVERSOR DE UNIDADES</h1>
            <div className="blurred-box-container">
                <div className="blurred-box">

                    {/* Selector de categoría principal */}
                    <div className="select-container">
                        <select
                            className="custom-select"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                        >
                            <option value="" disabled>Selecciona la unidad</option>
                            {Object.keys(categoryOptions).map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <div className="select-arrow">
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </div>
                    </div>




                    <div className="input-group">
                        {/* Input numérico */}
                        <div className="number-input-container">
                            <input
                                type="number"
                                className="number-input"
                                inputMode="numeric"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Ej: 1500"
                            />
                            <span className="input-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </div>

                        {/* Selector de unidad de origen */}
                        <div className="select-container">
                            <select
                                className="custom-select"
                                value={fromUnit}
                                onChange={handleFromUnitChange}
                                disabled={!selectedCategory}
                            >
                                <option value="" disabled>Selecciona unidad</option>
                                {selectedCategory && categoryOptions[selectedCategory].map((unit) => (
                                    <option key={`from-${unit}`} value={unit}>{unit}</option>
                                ))}
                            </select>
                            <div className="select-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>




                    <div class="area">
                        =
                    </div>


                    {/* Selector de unidad de destino */}
                    <div className="select-container">
                        <select
                            className="custom-select"
                            value={toUnit}
                            onChange={handleToUnitChange}
                            disabled={!selectedCategory}
                        >
                            <option value="" disabled>Selecciona unidad</option>
                            {selectedCategory && categoryOptions[selectedCategory].map((unit) => (
                                <option key={`to-${unit}`} value={unit}>{unit}</option>
                            ))}
                        </select>
                        <div className="select-arrow">
                            <svg viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </div>
                    </div>



                    <div className="status-container">
                        <div className="status">
                            <div className="mac-header">
                                <span className="red"></span>
                                <span className="yellow"></span>
                                <span className="green"></span>
                            </div>
                            <span>{result}</span>
                            <p>{convertedUnit}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* redes */}

            <ul class="example-2">
                <li class="icon-content">
                    <a
                        data-social="linkedin"
                        aria-label="LinkedIn"
                        href="https://www.linkedin.com/in/yan-franco-mieles-genez/"
                    >
                        <div class="filled"></div>
                        <svg
                            viewBox="0 0 16 16"
                            class="bi bi-linkedin"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                            ></path>
                        </svg>
                    </a>
                    <div class="tooltip">LinkedIn</div>
                </li>
                <li class="icon-content">
                    <a data-social="github" aria-label="GitHub" href="https://github.com/yan-franco">
                        <div class="filled"></div>
                        <svg
                            viewBox="0 0 16 16"
                            class="bi bi-github"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                            ></path>
                        </svg>
                    </a>
                    <div class="tooltip">GitHub</div>
                </li>
                {/* <li class="icon-content">
                    <a
                        data-social="instagram"
                        aria-label="Instagram"
                        href="https://www.instagram.com/"
                    >
                        <div class="filled"></div>
                        <svg
                            xml:space="preserve"
                            viewBox="0 0 16 16"
                            class="bi bi-instagram"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                            ></path>
                        </svg>
                    </a>
                    <div class="tooltip">Instagram</div>
                </li>
                <li class="icon-content">
                    <a data-social="youtube" aria-label="Youtube" href="https://youtube.com/">
                        <div class="filled"></div>
                        <svg
                            xml:space="preserve"
                            viewBox="0 0 16 16"
                            class="bi bi-youtube"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
                            ></path>
                        </svg>
                    </a>
                    <div class="tooltip">Youtube</div>
                </li> */}
            </ul>
        </div>

    )
}