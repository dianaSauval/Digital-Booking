import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selectStyles from '../../elementStyle/selectStyles';
import HoraContextProvider from '../../context/HoraContextProvider';

export default function SelectHora(requerido) {
    const [startTime, setStartTime] = useState(null); // Inicializa startTime con null
    const { setIsHora } = useContext(HoraContextProvider);

    const handleDateChange = (date) => {
        setStartTime(date);
        if (date) {
            const hora = date.getHours().toString().padStart(2, '0');
            const minutos = date.getMinutes().toString().padStart(2, '0');
            const segundos = date.getSeconds().toString().padStart(2, '0');
            const horaFormateada = `${hora}:${minutos}:${segundos}`;
            setIsHora(horaFormateada);
        } else {
            setIsHora(null); // Si date es null, establece isHora en null
        }
    };

    return (
        <DatePicker
            selected={startTime}
            onChange={handleDateChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className='inputHora'
            styles={selectStyles}
            locale="es"
            scrollableYearDropdown
            placeholderText="seleccionar hora de llegada"
            required={true}
        />
    );
}

